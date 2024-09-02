import { useEffect, useState } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import ContainerChat from "./ContainerChat";

function ChatComplaint() {
  const [isClicked, setIsClicked] = useState(false);
  const [showChatForm, setShowChatForm] = useState(false);

  const activeWhenClicked = `translate-y-32`;

  const handleClick = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setShowChatForm(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  const handleCloseModal = () => {
    setShowChatForm(false);
    setIsClicked(false);
  };

  return (
    <>
      <div
        className={`fixed bottom-10 right-10 flex items-center gap-2 bg-black text-white py-3 px-10 rounded-full shadow-md cursor-pointer transition-all ease-in-out duration-500 ${
          isClicked && activeWhenClicked
        }`}
        onClick={handleClick}
      >
        <IoChatbubbleOutline size={25} />
        <h3 className="font-bold text-xl">Chat</h3>
      </div>
      {showChatForm && <ContainerChat onCloseModal={handleCloseModal} />}
    </>
  );
}
export default ChatComplaint;
