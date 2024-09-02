import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import ImageProductSection from "../components/productDetails/ImageProductSection";
import DetailProductSection from "../components/productDetails/DetailProductSection";
import toast from "react-hot-toast";
import { useState } from "react";

function ProductDetailPage() {
  const { id } = useParams();
  const [size, setSize] = useState("");

  const queryClient = useQueryClient();

  const { mutate: updateWishlist } = useMutation({
    mutationFn: () => apiClient.updateWishlist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Success update wishlist");
    },
    onError: () => toast.error("Failed to update wishlist"),
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: () => apiClient.addToCart(id, size),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => toast.error("Failed to add to cart"),
  });

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => apiClient.getProductById(id),
    enabled: !!id,
  });

  if (!data) return null;

  return (
    <div className="container mx-auto pt-24 px-3 flex flex-col">
      <div className="flex items-center">
        <h3 className="font-semibold text-2xl">
          Home {"➡️"} {data?.category} {"➡️"} {data?.name}
        </h3>
      </div>
      <div className="flex flex-col gap-24">
        <div className="flex  flex-col lg:flex-row mt-5 gap-20">
          <ImageProductSection productImages={data?.imageUrls} />
          <DetailProductSection
            product={data}
            setSize={(size) => setSize(size)}
            addToCart={addToCart}
            updateWishlist={() => updateWishlist()}
          />
        </div>
        <div className="space-y-4">
          <div className="border-2 border-black w-fit py-2 px-5 font-bold text-lg">
            <h2>Description</h2>
          </div>
          <span className="line-clamp-4 font-medium text-md">
            {data.description}
          </span>
        </div>
      </div>
    </div>
  );
}
export default ProductDetailPage;
