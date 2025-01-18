import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SendChatMessage = ({ groupId, socket, senderId }) => {
  const [message, setMessage] = useState("");
  const { projectData } = useSelector((state) => state.projectSlice);
  const messageInputRef = useRef();
  const enterButtonRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        enterButtonRef.current.click();
      }
    };
  
    const inputElement = messageInputRef.current;
  
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }
  
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [messageInputRef, enterButtonRef]);
  

  const handleSendGroupMessage = () => {
    if (message && groupId && senderId && projectData?.members) {
      const messageObject = {
        messageText: message,
        sender: senderId,
        groupId,
        time: new Date(),
        isSeen: false,
        mediaUrl: "",
        replyTo: "",
      };
      socket.emit("groupMessage", {
        groupId: groupId,
        message: messageObject,
        members: projectData?.members,
      });
      return setMessage("");
    }
    return toast.error("Refresh the page and try again.");
  };

  return (
    <div className=" my-6 flex items-center gap-3 justify-end">
      <input
      ref={messageInputRef}
        type="text"
        placeholder="Type here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input input-bordered rounded-full focus:outline-none border-gray-500 placeholder:text-gray-600 min-w-[45%]"
      />
      <button
        ref={enterButtonRef}
        onClick={handleSendGroupMessage}
        className="bg-blue-500 hover:bg-blue-400 duration-300 text-white p-3 rounded-full tooltip tooltip-left"
        data-tip="Press Enter/click"
      >
        <FaPaperPlane className="text-2xl" />
      </button>
    </div>
  );
};

SendChatMessage.propTypes = {
  groupId: PropTypes.string,
  senderId: PropTypes.string.isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func,
    off: PropTypes.func,
  }).isRequired,
};

export default SendChatMessage;
