import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import toast from "react-hot-toast";

function LogoutButton() {
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return (
    <button
      className="border-2 border-black px-3 py-1 rounded-lg hover:translate-y-1 hover:translate-x-1 transition-all ease-in-out duration-150 font-bold"
      onClick={logout}
    >
      Logout
    </button>
  );
}
export default LogoutButton;
