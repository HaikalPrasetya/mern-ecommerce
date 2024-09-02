import { FaListUl } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-full w-[250px] pl-3 border-r-2 border-black absolute">
      <div className="mt-5 flex flex-col gap-3">
        <Link
          to="/add"
          className={`flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-300 py-4 ${
            location.pathname === "/add"
              ? "border-t-2 border-b-2 border-l-2 border-black"
              : ""
          }`}
        >
          <IoMdAddCircle />
          <h2 className="font-bold text-lg">Add Items</h2>
        </Link>
        <Link
          to="/list-products"
          className={`flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-300 py-4 ${
            location.pathname === "/list-products"
              ? "border-t-2 border-b-2 border-l-2 border-black"
              : ""
          }`}
        >
          <FaListUl />
          <h2 className="font-bold text-lg">List Items</h2>
        </Link>
        <Link
          to="/list-orders"
          className={`flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-300 py-4 ${
            location.pathname === "/list-orders"
              ? "border-t-2 border-b-2 border-l-2 border-black"
              : ""
          }`}
        >
          <MdPayment />
          <h2 className="font-bold text-lg">Orders</h2>
        </Link>
        <Link
          to="/messages"
          className={`flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-300 py-4 ${
            location.pathname === "/messages"
              ? "border-t-2 border-b-2 border-l-2 border-black"
              : ""
          }`}
        >
          <AiOutlineMessage />
          <h2 className="font-bold text-lg">Messages</h2>
        </Link>
      </div>
    </div>
  );
}
export default Sidebar;
