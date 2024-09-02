function SortOptions({ changeSortOptions }) {
  return (
    <select
      className="p-2 rounded-full bg-white border-2 border-black"
      onChange={changeSortOptions}
    >
      <option value="">Sort by</option>
      <option value="priceLowToHigh">Price - Low to High</option>
      <option value="priceHighToLow">Price - High to Low</option>
    </select>
  );
}
export default SortOptions;
