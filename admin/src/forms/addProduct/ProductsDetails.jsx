import { useState } from "react";
import ImageSection from "./ImageSection";
import { useForm, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import DescriptionSection from "./DescriptionSection";
import CategoryAndPriceSection from "./CategoryAndPriceSection";
import SizesSection from "./SizesSection";
import StatusSection from "./StatusSection";
import Button from "../../components/Button";
import { useEffect } from "react";

function ProductsDetails({ func, loading, product }) {
  const methods = useForm();
  const [imageFiles, setImageFiles] = useState([]);
  const [sizes, setSizes] = useState([]);

  const imageUrls = methods?.watch("imageUrls");

  const changeImages = (files) => {
    const totalFiles = (imageUrls ? imageUrls.length : 0) + files.length;
    if (totalFiles > 6) {
      toast.error("Cannot add more than 6 images");
      return;
    }
    setImageFiles(files);
  };

  const handleSizes = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const onSubmit = methods.handleSubmit((data) => {
    const totalFiles = (imageUrls ? imageUrls.length : 0) + imageFiles.length;

    if (totalFiles === 0) {
      toast.error("Please add images");
      return;
    }
    if (sizes.length < 1) {
      toast.error("Please add sizes");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("price", data.price);
    formData.append("status", data.status);
    sizes.forEach((size) => formData.append("sizes", size));
    if (product) {
      data.imageUrls.forEach((url) => formData.append("imageUrls", url));
    }
    Array.from(imageFiles).forEach((file) =>
      formData.append("imageFiles", file)
    );
    func(formData);
  });

  useEffect(() => {
    if (product) {
      methods.reset(product);
      setSizes(product.sizes);
    }
  }, [methods, product]);

  return (
    <FormProvider {...methods}>
      <form
        className="w-[500px] md:w-[568px] xl:w-[762px] px-7 py-5 space-y-5 "
        onSubmit={onSubmit}
      >
        <h1 className="text-5xl font-bold">
          {product ? "Update Product" : "Add Product"}
        </h1>
        <ImageSection changeImages={changeImages} imageFiles={imageFiles} />
        <DescriptionSection />
        <CategoryAndPriceSection />
        <SizesSection sizes={sizes} handleSizes={handleSizes} />
        <StatusSection />
        <div>
          <Button
            type="submit"
            disabled={loading}
            customClass="disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2">
              <span className="text-md font-medium">
                {loading ? "Loading..." : "Add Product"}
              </span>
            </div>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
export default ProductsDetails;
