import { useState } from "react";

function ImageProductSection({ productImages }) {
  const [activeImage, setActiveImage] = useState(productImages[0]);

  const fourImages = productImages?.filter((image) => image !== activeImage);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 4 IMAGES */}
      <div className="w-fit flex flex-row flex-wrap justify-center md:flex-col gap-3">
        {fourImages?.map((image, index) => (
          <div
            key={index}
            className="w-[150px] h-[150px] bg-center bg-cover bg-no-repeat cursor-pointer"
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setActiveImage(image)}
          ></div>
        ))}
      </div>
      {/* 1 IMAGE */}
      <div className="w-full">
        <img
          src={activeImage}
          className="w-full md:w-[900px] h-[550px] md:h-full object-cover cursor-pointer object-center"
        />
      </div>
    </div>
  );
}
export default ImageProductSection;
