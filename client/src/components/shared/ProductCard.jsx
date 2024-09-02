import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../utils/formatCurrency";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full rounded cursor-pointer overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-200"
      onClick={() => navigate(`/product/${product?._id}`)}
    >
      <img
        className="w-full h-[350px] object-cover"
        src={product?.imageUrls[0]}
        alt={product?.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product?.name}</div>
        {/* <p className="text-gray-700 text-base line-through">
          {product?.originalPrice}
        </p> */}
        <p className="text-red-500 text-lg font-bold">
          {formatRupiah(product?.price)}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
