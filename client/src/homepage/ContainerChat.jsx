import ChatForm from "./ChatForm";
import * as apiClient from "../apiClient";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function ContainerChat({ onCloseModal }) {
  const { mutate: sendMsg } = useMutation({
    mutationFn: apiClient.sendMessageToAdmin,
    onSuccess: () => {
      toast.success("Pesan terkirim");
    },
    onError: () => {
      toast.error("Pesan gagal dikirim");
    },
  });

  const handleSendMessage = (data) => {
    sendMsg(data);
    onCloseModal();
  };

  return (
    <div className="fixed bottom-10 right-10 gap-2 shadow-md h-[500px] overflow-scroll w-[400px] border-2 border-black bg-white">
      <div className="w-full bg-black p-2 text-white font-bold text-xl flex justify-center items-center relative">
        <h3>Chat/ Kirim Pesan</h3>
        <button className="absolute right-5" onClick={onCloseModal}>
          X
        </button>
      </div>
      {/* FORM */}
      <ChatForm handleSendMessage={handleSendMessage} />
    </div>
  );
}
export default ContainerChat;
