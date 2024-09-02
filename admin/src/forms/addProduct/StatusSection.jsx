import { useFormContext } from "react-hook-form";

function StatusSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-lg">Status</span>
        <select
          {...register("status", {
            required: "Please select a category",
          })}
          className="p-3 border-2 border-black rounded-lg w-[150px]"
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        {errors.status && (
          <span className="text-red-500 font-semibold text-md">
            {errors.status.message}
          </span>
        )}
      </div>
    </div>
  );
}
export default StatusSection;
