import { useForm } from "react-hook-form";

function ChatForm({ handleSendMessage }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    handleSendMessage(data);
  };

  return (
    <form className="p-5 space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <label className="flex flex-col gap-2">
        <h5 className="font-bold">Message</h5>
        <textarea
          rows={10}
          type="text"
          className="border-2 border-black w-full rounded p-2"
          {...register("message", {
            required: "Message is required",
          })}
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}
      </label>
      <button
        type="submit"
        className="w-full border-2 border-black font-semibold text-md py-3 rounded custom-box-shadow disabled:cursor-not-allowed"
      >
        Send Message
      </button>
      <p className="font-bold text-sm uppercase">
        {"*"} jika pesan berhasil terkirim, kami akan memeriksa pesan dari anda
        dan kami akan mengirim pesan kepada anda melalui inbox section di atas,
        jika anda belum menerima pesan dari kami dalam waktu 24 jam, silahkan
        hubungi nomer ini {"=>"} 087822524445
        <br />
        <br />
        <br />
        {"*"} jangan SPAM, jika SPAM akan kami MENONAKTIFKAN akun anda
      </p>
    </form>
  );
}
export default ChatForm;
