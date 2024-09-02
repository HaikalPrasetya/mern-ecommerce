import { useFormContext } from "react-hook-form";

function DescriptionSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <label>
        <span className="font-semibold text-lg">Product name</span>
        <input
          type="text"
          className="w-full border-2 border-black focus:outline-none font-bold text-xl py-3 px-2 rounded"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <span className="text-red-500 font-semibold text-md">
            {errors.name.message}
          </span>
        )}
      </label>
      <label>
        <span className="font-semibold text-lg">Product description</span>
        <textarea
          type="text"
          rows={10}
          className="w-full border-2 border-black focus:outline-none font-bold text-xl py-3 px-2 rounded"
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 1000,
              message: "Description cannot be more than 1000 characters",
            },
          })}
        />
        {errors.description && (
          <span className="text-red-500 font-semibold text-md">
            {errors.description.message}
          </span>
        )}
      </label>
    </div>
  );
}
export default DescriptionSection;
