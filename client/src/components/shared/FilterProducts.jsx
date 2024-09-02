function FilterProducts({ changeSizeFilter, setSelectedPrice }) {
  return (
    <div className="w-full border-2 border-black py-4 px-3 rounded flex gap-9">
      <div className="dropdown dropdown-bottom">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 uppercase font-bold text-xl"
        >
          Size
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex flex-col gap-2"
        >
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              className="flex gap-2 items-center font-semibold text-md"
            >
              <input type="checkbox" value={size} onChange={changeSizeFilter} />
              <span>{size}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="dropdown dropdown-bottom">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 uppercase font-bold text-xl"
        >
          Price
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex flex-col gap-2"
        >
          {[100, 200, 300, 400, 500].map((price) => (
            <div
              key={price}
              className="flex gap-2 items-center font-semibold text-md p-3 hover:bg-gray-200 rounded"
              onClick={() => setSelectedPrice(price)}
            >
              <span>{price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FilterProducts;
