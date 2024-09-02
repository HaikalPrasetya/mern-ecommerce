function SizesSection({ sizes, handleSizes }) {
  if (!sizes) {
    return <></>;
  }

  return (
    <div>
      <span className="font-semibold text-lg">Sizes</span>
      <div className="flex flex-wrap gap-5">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <button
            key={size}
            className={`border-2 border-black py-3 font-bold text-md rounded w-[70px] transition-all ease-in-out duration-150 ${
              sizes.includes(size)
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleSizes(size);
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
export default SizesSection;
