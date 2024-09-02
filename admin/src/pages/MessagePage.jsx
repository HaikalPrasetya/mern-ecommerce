import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import CardMessage from "../components/CardMessage";

function MessagePage() {
  const { data: messages } = useQuery({
    queryKey: ["messagesFromUsers"],
    queryFn: apiClient.getAllMessagesFromUser,
  });

  return (
    <div className="p-10">
      <h1 className="font-bold text-5xl">Messages</h1>
      <div className="grid grid-cols-1 mt-5 gap-10 items-center">
        {messages?.map((message, i) => (
          <CardMessage key={i} message={message} />
        ))}
      </div>
    </div>
  );
}
export default MessagePage;
