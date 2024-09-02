import { useState } from "react";
import { formatRupiah } from "../../utils/formatCurrency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import toast from "react-hot-toast";

function ProductsBag({ product, user, handleRemoveProduct }) {
  const queryClient = useQueryClient();
  const desCart = user?.cart?.find((item) => item.product._id === product._id);
  const [qty, setQty] = useState(desCart?.quantity || 1);

  const { mutate: updateQty } = useMutation({
    mutationFn: () => apiClient.updateQty(product._id, qty),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
        queryClient.invalidateQueries({ queryKey: ["me"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message || "Terjadi kesalahan");
    },
  });

  return (
    <div className="grid grid-cols-[200px_2fr] gap-4 border-b-2 border-slate-200 pb-2">
      <div className="w-full h-[250px]">
        <img
          src={product.imageUrls[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-5">
        <h3 className="font-bold text-xl">{product.name}</h3>
        <div className="flex flex-col gap-2 text-slate-700 font-medium text-lg">
          <h5>Category: {product.category}</h5>
          <h5>Size: {desCart ? desCart.size : ""}</h5>
          <h5>Tersedia</h5>
          <button
            className="w-fit hover:underline"
            onClick={() => handleRemoveProduct(product._id)}
          >
            Hapus
          </button>
          <div>
            <select
              className="w-fit px-3 py-2 rounded"
              value={qty}
              onChange={(e) => {
                setQty(e.target.value);
                updateQty();
              }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <h3 className="font-medium text-xl">
            {formatRupiah(desCart?.quantity * product?.price)}
          </h3>
        </div>
      </div>
    </div>
  );
}
export default ProductsBag;
