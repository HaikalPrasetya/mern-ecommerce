import { useAppContext } from "../context/AppContext";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "./Button";

function LogoutButton() {
  const { changeStateLogin } = useAppContext();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: () => {
      toast.success("Logout success");
      navigate("/login");
    },
  });

  const handleLogout = () => {
    logout();
    changeStateLogin("");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
export default LogoutButton;
