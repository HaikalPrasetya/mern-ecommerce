import ProductsDetails from "../forms/addProduct/ProductsDetails";
import * as apiClient from "../apiClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function UpdateProductPage() {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => apiClient.getProductById(productId),
    enabled: !!productId,
  });

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: (data) => apiClient.updateProduct(productId, data),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  const handleUpdateProduct = (data) => {
    updateProduct(data);
  };

  if (!product) {
    return <></>;
  }

  return (
    <ProductsDetails
      func={handleUpdateProduct}
      loading={isUpdating}
      product={product}
    />
  );
}
export default UpdateProductPage;
