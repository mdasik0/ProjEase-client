import { useState } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SendChatMessage = ({ groupChatId, socket, senderId }) => {
  const [message, setMessage] = useState("");
  const {projectData} = useSelector(state => state.projectSlice);
  
  const handleSendGroupMessage = () => {
    if (message && groupChatId && senderId && projectData?.members) {
      const messageObject = {
        messageText: message,
        sender: senderId,
        groupChatId,
        time: new Date(),
        isSeen: false,
        mediaUrl: '',
        replyTo: '',
         
      }
      socket.emit("groupMessage", { groupId: groupChatId, message: messageObject, members: projectData?.members });
      return setMessage("");
    }
    return toast.error("Refresh the page and try again.");
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
  groupChatId: PropTypes.string,
  senderId: PropTypes.string.isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func,
    off: PropTypes.func,
  }).isRequired,
};

export default SendChatMessage;
