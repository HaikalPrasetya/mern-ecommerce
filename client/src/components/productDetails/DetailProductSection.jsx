import { useEffect, useState } from "react";
import { formatRupiah } from "../../utils/formatCurrency";
import SizeItem from "./SizeItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

function DetailProductSection({ product, setSize, addToCart, updateWishlist }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      const checkUserAlreadyAddedToCart = user.cart.find(
        (item) => item.product.toString() === product._id.toString()
      );
      if (checkUserAlreadyAddedToCart) {
        setIsAddedToCart(true);
      } else {
        setIsAddedToCart(false);
      }
    }
  }, [user, product._id]);

  useEffect(() => {
    if (user) {
      const alreadyExistInWishlist = user.wishlist.some(
        (pId) => pId.toString() === product._id.toString()
      );
      if (alreadyExistInWishlist) {
        setIsWishlist(true);
      } else {
        setIsWishlist(false);
      }
    }
  }, [product._id, user]);

  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Please select a size");
    setSize(selectedSize);
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (addToCart && user) {
      addToCart();
      if (!isAddedToCart) {
        toast.success("Product sudah ditambahkan ke keranjang");
        return;
      } else {
        toast.success("Product sudah dihapus dari keranjang");
      }
    }
  };

  const handleCheckOut = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    sessionStorage.setItem("total", product.price);
    sessionStorage.setItem("ids", [product._id]);
    navigate("/checkout");
  };

  const inStock = product.status;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-3xl">{product.name}</h1>
      <h4 className="text-2xl font-medium text-red-500">
        {formatRupiah(product.price)}
      </h4>
      <div className="flex flex-col gap-3">
        <span className="text-lg font-bold">Select Size:</span>
        <div className="flex gap-5">
          {product.sizes.sort().map((size) => (
            <SizeItem
              key={size}
              size={size}
              changeSize={(size) => setSelectedSize(size)}
              selectedSize={selectedSize}
            />
          ))}
        </div>
      </div>
      <div className="cursor-pointer" onClick={updateWishlist}>
        {isWishlist ? <FaRegHeart fill="red" /> : <FaRegHeart fill="black" />}
      </div>
      <div className="flex flex-col gap-5">
        <button
          className="border-2 border-black py-3 font-bold text-lg custom-box-shadow  hover:translate-x-1 hover:translate-y-1 transition-all ease-in-out duration-200"
          onClick={handleAddToCart}
        >
          {isAddedToCart ? "Sudah ditambahkan" : "Masukan ke keranjang"}
        </button>
        {inStock === "In Stock" ? (
          <button
            className="border-2 border-black bg-black text-white py-3 font-bold text-lg custom-box-shadow-left hover:-translate-x-1 hover:translate-y-1  transition-all ease-in-out duration-200"
            onClick={handleCheckOut}
          >
            Buy now
          </button>
        ) : (
          <button className="border-2 border-black bg-black text-white py-3 font-bold text-lg custom-box-shadow-left cursor-not-allowed ">
            Stok Habis
          </button>
        )}
      </div>
      <div>
        <div className="font-bold text-xl">
          Category:{" "}
          <span className="font-normal">
            {product.category} | {product.subCategory}
          </span>
        </div>
        <div className="font-bold text-xl">
          Sold: <span className="font-normal">{product.sold}</span>
        </div>
      </div>
    </div>
  );
}
export default DetailProductSection;
