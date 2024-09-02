import ProductsDetails from "../forms/addProduct/ProductsDetails";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import toast from "react-hot-toast";

function AddPage() {
  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: apiClient.addProduct,
    onSuccess: () => {
      toast.success("Product added successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data) => {
    addProduct(data);
  };

  return <ProductsDetails func={onSubmit} loading={isAdding} />;
}
export default AddPage;
