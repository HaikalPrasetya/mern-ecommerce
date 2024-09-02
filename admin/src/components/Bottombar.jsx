import { FaListUl } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { MdPayment } from "react-icons/md";

function BottomBar() {
  return (
    <div className="flex lg:hidden border-t-2 border-black px-2 h-[50px] bg-[rgb(242,242,242)]">
      <div className="grid grid-cols-3 w-full">
        <Link
          to="/add"
          className="flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-300"
        >
          <IoMdAddCircle />
          <h2 className="font-bold text-lg">Add Items</h2>
        </Link>
        <Link
          to="/list-products"
          className="border-r-2 border-l-2 border-black flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-300"
        >
          <FaListUl />
          <h2 className="font-bold text-lg">List Items</h2>
        </Link>
        <Link
          to="/orders"
          className="flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-300"
        >
          <MdPayment />
          <h2 className="font-bold text-lg">Orders</h2>
        </Link>
      </div>
    </div>
  );
}
export default BottomBar;
