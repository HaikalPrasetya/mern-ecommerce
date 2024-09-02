import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../apiClient";
import { useState } from "react";
import toast from "react-hot-toast";

function MessageDetail() {
  const [repliesMsg, setRepliesMsg] = useState("");
  const { id } = useParams();
  const { data: messageDetail } = useQuery({
    queryKey: ["messages"],
    queryFn: () => apiClient.getMessageById(id),
    enabled: !!id,
  });

  const { mutate: replyMessage } = useMutation({
    mutationFn: () => apiClient.replyMessage(id, repliesMsg),
    onSuccess: () => {
      toast.success("Replied successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="p-10">
      <div className="text-xl">
        <h1>
          Message from user:{" "}
          <span className="font-bold">{messageDetail?.message}</span>
        </h1>
      </div>
      <div>
        <h3 className="font-bold text-lg">Replies: </h3>
        <textarea
          rows={15}
          className="w-[500px]"
          value={repliesMsg}
          onChange={(e) => setRepliesMsg(e.target.value)}
        />
      </div>
      <button
        className="py-2 px-3 bg-black text-white font-bold text-md border-2 border-black rounded disabled:cursor-not-allowed"
        disabled={!repliesMsg}
        onClick={() => {
          replyMessage();
        }}
      >
        Reply
      </button>
    </div>
  );
}
export default MessageDetail;
