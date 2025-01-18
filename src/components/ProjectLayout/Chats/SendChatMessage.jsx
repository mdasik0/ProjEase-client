import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { IoIosImages } from "react-icons/io";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const SendChatMessage = ({
  groupId,
  socket,
  senderId,
  messageInputRef,
  replyDetails,
  cancelReply
}) => {
  const [message, setMessage] = useState("");
  const { projectData } = useSelector((state) => state.projectSlice);
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
        reply: replyDetails,
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
    <div className=" my-6 flex flex-col items-end gap-3 justify-end ">
{
  replyDetails.originalSender &&       <div className="reply-section bg-gray-100 px-2 py-1 w-full border-t flex items-center justify-between">
  <div>
  <h4 className="font-[500] text-black mb-1.5">Replying to {replyDetails?.originalSender}</h4>
  <p classNme="text-sm font-gray-600">{replyDetails?.originalMessage?.length > 50 ? replyDetails.originalMessage.slice(0,50) + "..." : replyDetails?.originalMessage }</p>
  </div>
  <div className="bg-gray-200 hover:bg-gray-300 duration-500 cursor-pointer active:scale-75 p-1 rounded-full">
  
  <RxCross2 className="text-lg" onClick={cancelReply} />
  </div>
        </div>
}
      <div className="flex items-center gap-3  w-full">
        <button
          className="bg-gray-200 hover:bg-gray-400 duration-300 p-3 rounded-full tooltip tooltip-right"
          data-tip="Select Document"
        >
          <IoDocumentAttachOutline className="text-2xl" />
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-400 duration-300 p-3 rounded-full tooltip tooltip-top"
          data-tip="Select Image"
        >
          <IoIosImages className="text-2xl" />
        </button>
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input input-bordered rounded-full w-full focus:outline-none border-gray-500 placeholder:text-gray-600 min-w-[45%]"
        />
        <button
          ref={enterButtonRef}
          onClick={handleSendGroupMessage}
          className="bg-blue-500 active:scale-95 hover:bg-blue-400 duration-300 text-white p-3 rounded-full tooltip tooltip-left"
          data-tip="Press Enter/click"
        >
          <FaPaperPlane className="text-2xl" />
        </button>
      </div>
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
