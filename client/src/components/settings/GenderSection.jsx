import { useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";

function GenderSection({ updateUser }) {
  const { user } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [updateGender, setUpdateGender] = useState(user?.gender);
  const modalRef = useRef(null);

  const handleOpenModal = () => {
    setShowModal(true);
    modalRef?.current?.showModal();
  };

  const handleChangeGender = (e) => {
    user.gender = e.target.value;
    setUpdateGender(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(user);
    setShowModal(false);
  };

  return (
    <div className="flex gap-3">
      <span>{user.gender}</span>
      <button className="text-green-600" onClick={handleOpenModal}>
        Edit Gender
      </button>
      {showModal && (
        <dialog className="modal" ref={modalRef}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Gender</h3>
            <div className="modal-action">
              <form className="w-full flex flex-col" onSubmit={onSubmit}>
                <div className="flex gap-4 items-center">
                  {["Laki-laki", "Perempuan"].map((gender) => (
                    <label key={gender} className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        value={gender}
                        checked={gender === updateGender}
                        onChange={handleChangeGender}
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="w-full border-2 border-black my-5 py-2 font-semibold text-md"
                  >
                    Simpan
                  </button>
                  <button className="w-full border-2 bg-red-500 border-black my-5 py-2 font-semibold text-md text-white">
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
export default GenderSection;
