import PropTypes from "prop-types";
import { useState } from "react";
import { MdDelete, MdOutlineReply } from "react-icons/md";
import Modal from "../../Shared/Modal";
import { IoWarningOutline } from "react-icons/io5";

const MyChatCard = ({ message, reply, setMessages, messages, socket, index}) => {
  const [isOpen, setIsOpen] = useState(false);
  const messageText = message?.msgObj?.messageText;
  const sender = [message?.sender?.userName, message?.sender?.userId];
  const openDeleteModal = () => {
    setIsOpen(true)
  }
  const handleDeleteMessage = (_id) => {
    const withoutDeleteMessage = messages.filter(msg => msg._id !== _id);
    setMessages([...withoutDeleteMessage]);
    setIsOpen(false)
    socket.emit('deleteMessage',_id)
  }
  const handleCancelMessage = () => {
    setIsOpen(false);
  }

 
  
  return (
    <div className="flex flex-row-reverse items-end group w-full">
      <div className="chat-card-container flex flex-col items-end justify-end max-w-[50%] min-w-[10%] relative">
        {/* reply */}
        {message?.msgObj?.reply?.originalMessage && (
          <p className="text-[13px] text-black me-1 flex items-center gap-1 ">
            <MdOutlineReply /> {message?.sender?.userName} replied to {message?.msgObj?.reply?.originalSender[0]}
          </p>
        )}
        {message?.msgObj?.reply?.originalMessage && (
          <div className="w-fit py-2 text-start px-3 pe-6 rounded-xl bg-blue-200 -mb-5">
            <p className="replyText text-sm text-gray-700">{message?.msgObj?.reply?.originalMessage}</p>
            <div className="p-3"></div>
          </div>
        )}
        {/* reply */}
        {/* message */}
        <div className="w-fit">
          <div className="message-actions-container relative">
            <p className="message text-[15px] bg-blue-400 text-white p-2 px-3.5 rounded-xl rounded-br-none">
              {messageText}
            </p>
            <div className="replyandActions opacity-0 group-hover:opacity-100 duration-300">
              {/* button reply */}
              <button
                onClick={() => reply(messageText, sender)}
                className={`bg-gray-200 border border-gray-400 p-1.5 rounded-full active:scale-95 hover:bg-gray-200 duration-300 tooltip ${index === 0 ? 'tooltip-bottom' : 'tooltip-top'} absolute top-[50%] -translate-y-[50%] -left-10`}
                data-tip="reply"
                >
                <MdOutlineReply className="text-lg" />
              </button>
                {/* button delete message */}
              <button
                onClick={() => openDeleteModal()}
                className={`bg-gray-200 border border-gray-400 p-1.5 rounded-full active:scale-95 hover:bg-gray-200 duration-300 tooltip ${index === 0 ? 'tooltip-bottom' : 'tooltip-top'} absolute top-[50%] -translate-y-[50%] -left-20`}
                data-tip="delete"
              >
                <MdDelete className="text-lg" />
              </button>
              <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="p-3">
                  <h3 className="text-[21px] font-[500] mb-2">Do you want to delete this message?</h3>
                  <p className="text-sm text-gray-500"><IoWarningOutline className="inline text-amber-600" /> If you delete this message you can not recover it anymore.</p>
                  <div className="mt-3 flex gap-3">
                    <button className="bg-red-500 hover:bg-red-400 duration-200 text-white px-4 py-1.5 rounded" onClick={() => handleDeleteMessage(message?._id)}>Delete</button>
                  <button className="bg-green-500 hover:bg-green-400 duration-200 text-white px-4 py-1.5 rounded" onClick={() => handleCancelMessage()}>Cancel</button>
                  </div>

                </div>
              </Modal>
            </div>
          </div>
        </div>
        {/* message */}
      </div>
    </div>
  );
};

MyChatCard.propTypes = {
  socket: PropTypes.shape({
      emit: PropTypes.func,
      on: PropTypes.func,
      off: PropTypes.func,
    }),
  message: PropTypes.shape({
    _id: PropTypes.string,
    msgObj: PropTypes.shape({
      messageText: PropTypes.string, 
      reply: PropTypes.shape({
        originalMessage: PropTypes.string, 
        originalSender: PropTypes.arrayOf(PropTypes.string), 
      }),
    }),
    sender: PropTypes.shape({
      userId: PropTypes.string, 
      userName: PropTypes.string, 
    }),
  }),
  messages:  PropTypes.func,
  index:  PropTypes.number,
  setMessages: PropTypes.func,
  reply: PropTypes.func, 
};

export default MyChatCard;
