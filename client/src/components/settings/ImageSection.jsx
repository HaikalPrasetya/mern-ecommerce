import { useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import * as apiClient from "../../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function ImageSection() {
  const { user } = useAppContext();
  const imageRef = useRef(null);
  const queryClient = useQueryClient();

  const { mutate: updateImage } = useMutation({
    mutationFn: apiClient.updateProfilePic,
    onSuccess: () => {
      toast.success("Foto profil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(error.message || "Terjadi kesalahan");
    },
  });

  const handleChangeImage = (e) => {
    const file = e.target.files?.[0];
    const newFormData = new FormData();
    newFormData.append("imageFile", file);
    if (file) updateImage(newFormData);
  };

  return (
    <div>
      <div className="w-52 h-52">
        <img
          src={user.profilePic}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <input type="file" hidden ref={imageRef} onChange={handleChangeImage} />
      <button
        className="w-full border-2 border-black rounded mt-3 py-3"
        onClick={() => imageRef.current.click()}
      >
        Pilih Foto
      </button>
    </div>
  );
}
export default ImageSection;
