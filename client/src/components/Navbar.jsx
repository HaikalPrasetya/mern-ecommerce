import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FaCartShopping } from "react-icons/fa6";
import LogoutButton from "../components/LogoutButton";
import { FaBell } from "react-icons/fa";

function Navbar() {
  const { pathname } = useLocation();
  const { user } = useAppContext();

  const dropdownLinks = [
    {
      title: "Pembelian",
      url: "/my-orders",
    },
    {
      title: "Wishlist",
      url: "/wishlist",
    },
    {
      title: "Settings",
      url: "/user/settings",
    },
  ];

  return (
    <div className="navbar bg-base-100 border-b-2 border-black fixed top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="font-bold text-xl lg:text-2xl ">
          Adios
        </Link>
      </div>
      <div className="navbar-center hidden md:block">
        <div className="flex items-center gap-5 text-md font-semibold">
          {["Men's", "Women's", "Kids"].map((item) => {
            const url = item.split("'").join("").toLowerCase();
            return (
              <Link
                key={item}
                className={`hover:underline transition-all ease-in-out duration-200 ${
                  pathname === `/${url}` ? "underline" : ""
                }`}
                to={`/${url}`}
              >
                <span>{item}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="navbar-end">
        {!user ? (
          <Link
            to="/login"
            className="border-2 border-black px-3 py-1 rounded-lg hover:translate-y-1 hover:translate-x-1 transition-all ease-in-out duration-150 font-bold"
          >
            Login
          </Link>
        ) : (
          <div className="flex gap-7 items-center">
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="avatar">
                <div className="w-10">
                  <img
                    src={user?.profilePic}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                {dropdownLinks.map((link) => (
                  <li key={link.title}>
                    <Link to={link.url}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link to={`/my-cart`} className="relative cursor-pointer">
              <FaCartShopping size={20} />
              <span className="absolute -top-5 right-0">
                <span className="text-xs">{user?.cart.length}</span>
              </span>
            </Link>
            <Link to={`/notifications`} className="relative cursor-pointer">
              <FaBell size={20} />
            </Link>
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
