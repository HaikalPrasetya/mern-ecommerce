import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function CardMessage({ message }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex gap-5">
        <h1
          className={`${
            !message.isRead
              ? "font-bold text-lg"
              : "text-lg font-normal text-slate-500"
          }`}
        >
          From: {message.sender.firstName}
        </h1>
        <Button onClick={() => navigate(`/messages/${message._id}`)}>
          See Details
        </Button>
      </div>
    </div>
  );
}
export default CardMessage;
