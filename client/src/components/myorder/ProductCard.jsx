import { formatRupiah } from "../../utils/formatCurrency.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient.jsx";

function ProductCard({ order }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: apiClient.completeOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-orders"],
      });
    },
  });
  const handleCompleteOrder = () => {
    mutate(order._id);
  };
  return (
    <div className="flex gap-4 items-center border-2 border-black p-4 rounded w-fit">
      <div className="w-24 h-24">
        <img
          src={order.product.imageUrls[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Product Name</span>
        <h2 className="font-bold text-md">{order.product.name}</h2>
        <span className="font-semibold text-md text-slate-500">
          {order.quantity} barang x {formatRupiah(order.product.price)}
        </span>
      </div>
      <div className="flef flex-col gap-2">
        <span className="font-bold">Total Belanja</span>
        <h4>{formatRupiah(order.totalPrice)}</h4>
      </div>
      <div className="flef flex-col gap-2">
        <span className="font-bold">Status</span>
        <h4>{order.status}</h4>
      </div>
      <div>
        {order.status === "dikirim" && (
          <button
            className="border-2 border-black px-4 py-2 rounded"
            onClick={handleCompleteOrder}
          >
            Selesai
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
