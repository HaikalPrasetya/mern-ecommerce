import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import toast from "react-hot-toast";

function AddressSection() {
  const { user } = useAppContext();
  const queryClient = useQueryClient();
  const [address, setAddress] = useState(user?.addressDetails || "");
  const { mutate: updateAddress } = useMutation({
    mutationFn: apiClient.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Berhasilahkan alamat");
    },
    onError: (error) => toast.error(error.message || "Terjadi kesalahan"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.length < 10) {
      return toast.error("Masukkan alamat dengan benar");
    }
    user.addressDetails = address;
    updateAddress(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <textarea
          rows={15}
          type="text"
          minLength={10}
          className="border-2 border-black py-2 px-3 focus:outline-none text-sm w-[250px] md:w-[350px]"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <button className="border-2 border-black py-2 px-3 focus:outline-none text-sm rounded">
        Simpan
      </button>
    </form>
  );
}
export default AddressSection;
