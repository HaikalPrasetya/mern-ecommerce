import { useRef } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import Button from "../../components/Button";
import { useFormContext } from "react-hook-form";
import { RiCloseCircleLine } from "react-icons/ri";

function ImageSection({ changeImages, imageFiles }) {
  const imageRef = useRef();

  const { watch, setValue } = useFormContext();

  const imageUrls = watch("imageUrls");

  const handleRemoveImage = (imgUrl) => {
    setValue(
      "imageUrls",
      imageUrls.filter((url) => url !== imgUrl)
    );
  };

  return (
    <label className="flex flex-col gap-2">
      <span className="font-semibold text-lg">Images</span>
      {imageFiles && imageFiles.length > 0 && (
        <span className="text-lg font-bold">
          {imageFiles.length} images selected
        </span>
      )}
      <div>
        {imageUrls && imageUrls.length > 0 && (
          <div className="flex gap-5 flex-wrap">
            {imageUrls.map((image) => (
              <div key={image} className="relative">
                <img
                  src={image}
                  alt="product image"
                  className="w-32 h-32 object-cover"
                />
                <button
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:bg-red-900"
                  onClick={() => handleRemoveImage(image)}
                >
                  <RiCloseCircleLine size={25} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button onClick={() => imageRef.current.click()}>
        <div className="flex items-center gap-2">
          <IoAddCircleSharp />
          <span className="text-md font-medium">Add Images</span>
        </div>
      </Button>
      <input
        type="file"
        hidden
        multiple
        accept="image/*"
        ref={imageRef}
        onChange={(e) => {
          changeImages(e.target.files);
        }}
      />
    </label>
  );
}
export default ImageSection;
