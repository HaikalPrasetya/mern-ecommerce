function SizeItem({ size, changeSize, selectedSize }) {
  return (
    <button
      className={`border-2 border-black w-[70px] h-[60px] ${
        selectedSize === size ? "bg-black text-white" : ""
      }`}
      onClick={() => changeSize(size)}
    >
      <span className="font-bold text-lg">{size}</span>
    </button>
  );
}
export default SizeItem;
