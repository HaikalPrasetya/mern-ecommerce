import { useFormContext } from "react-hook-form";

function CategoryAndPriceSection() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const priceInRp = watch("price");

  const formatToRp = (number) => {
    if (!number) return 0;

    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <div className="flex items-center gap-10">
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-lg">Product Category</span>
        <select
          {...register("category", {
            required: "Please select a category",
          })}
          className="p-3 border-2 border-black rounded-lg w-[150px]"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        {errors.category && (
          <span className="text-red-500 font-semibold text-md">
            {errors.category.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold text-lg">Sub Category</span>
        <select
          {...register("subCategory", {
            required: "Please select a category",
          })}
          className="p-3 border-2 border-black rounded-lg w-[150px]"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
        {errors.subCategory && (
          <span className="text-red-500 font-semibold text-md">
            {errors.subCategory.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col">
        <span className="font-semibold text-lg">Price</span>
        <input
          type="text"
          placeholder="Price"
          className="p-3 border-2 border-black rounded-lg w-[150px]"
          {...register("price", {
            valueAsNumber: true,
            required: "Please enter a price",
          })}
        />
        <span className="absolute  w-fit translate-x-[160px] translate-y-[40px]">
          {formatToRp(priceInRp)}
        </span>
        {errors.price && (
          <span className="text-red-500 font-semibold text-md">
            {errors.price.message}
          </span>
        )}
      </div>
    </div>
  );
}
export default CategoryAndPriceSection;
