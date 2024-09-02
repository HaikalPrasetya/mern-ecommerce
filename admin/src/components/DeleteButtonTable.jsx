import Button from "../components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import { toast } from "react-hot-toast";

function DeleteButtonTable({ id }) {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct } = useMutation({
    mutationFn: apiClient.deleteProduct,
    onSuccess: (msg) => {
      toast.success(msg.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleDeleteProduct = () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    deleteProduct(id);
  };

  return (
    <Button customClass="bg-red-500" onClick={handleDeleteProduct}>
      Delete
    </Button>
  );
}
export default DeleteButtonTable;
