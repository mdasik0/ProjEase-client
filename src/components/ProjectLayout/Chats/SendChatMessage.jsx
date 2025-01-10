import { useState } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import PropTypes from "prop-types";

const SendChatMessage = ({ groupChatId, socket, senderId }) => {
  const [message, setMessage] = useState("");
  

  
  const handleSendGroupMessage = () => {
    if (message && groupChatId && senderId) {
      const messageObject = {
        messageText: message,
        sender: senderId,
        groupChatId,
        time: new Date(),
        isSeen: false,
        mediaUrl: '',
        replyTo: '',
         
      }
      // console.log('message', message);
      // console.log('group', groupChatId);
      socket.emit("groupMessage", { groupId: groupChatId, message: messageObject });
      return setMessage("");
    }
    return toast.error("Group ID and message are required");
  };

  return (
    <div className="m-6 flex items-center gap-3 justify-end mx-8">
      <input
        type="text"
        placeholder="Type here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input input-bordered rounded-full focus:outline-none border-gray-500 placeholder:text-gray-600 min-w-[45%]"
      />
      <button
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
  groupChatId: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func,
    off: PropTypes.func,
  }).isRequired,
};

export default SendChatMessage;
