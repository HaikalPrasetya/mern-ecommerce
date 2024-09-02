import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import GenderSection from "./GenderSection";

function PersonalData() {
  const { user } = useAppContext();
  const [modalName, setModalName] = useState("");
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const modalRef = useRef(null);

  const handleOpenModal = (name) => {
    setModalName(name);
    modalRef.current.showModal();
  };

  const { mutate: updateUser } = useMutation({
    mutationFn: apiClient.updateUser,
    onSuccess: () => {
      toast.success("User updated successfully");
      modalRef.current.close();
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName) return;
    if (modalName === "firstName") {
      user.firstName = firstName;
    } else {
      user.lastName = lastName;
    }
    updateUser(user);
  };

  return (
    <div className="mt-3">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <h4>FirstName</h4>
          <h2>LastName</h2>
          <h4>Gender</h4>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <h4>{user?.firstName}</h4>
            <button
              className="text-green-600"
              onClick={() => handleOpenModal("firstName")}
            >
              Edit Firstname
            </button>
          </div>
          <div className="flex gap-4">
            <h4>{user?.lastName}</h4>
            <button
              className="text-green-600"
              onClick={() => handleOpenModal("lastName")}
            >
              Edit Lastname
            </button>
          </div>
          <GenderSection updateUser={updateUser} />
        </div>
      </div>
      {modalName && (
        <dialog id={`my_modal:${modalName}`} className="modal" ref={modalRef}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update {modalName}</h3>
            <div className="modal-action">
              <form className="w-full" onSubmit={onSubmit}>
                {modalName === "firstName" ? (
                  <label>
                    <span className="font-semibold text-md">First Name</span>
                    <input
                      type="text"
                      className="w-full border-2 border-black focus:outline-none py-2 px-3"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                ) : (
                  <label>
                    <span className="font-semibold text-md">Last Name</span>
                    <input
                      type="text"
                      className="w-full border-2 border-black focus:outline-none py-2 px-3"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="w-full border-2 border-black my-5 py-2 font-semibold text-md"
                  >
                    Simpan
                  </button>
                  <button
                    className="w-full border-2 bg-red-500 border-black my-5 py-2 font-semibold text-md text-white"
                    onClick={() => {
                      setModalName("");
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default PersonalData;
