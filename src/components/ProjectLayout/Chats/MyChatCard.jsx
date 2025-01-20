import PropTypes from "prop-types";
import { MdOutlineReply } from "react-icons/md";

const MyChatCard = ({ message, reply }) => {
  const messageText = message?.msgObj?.messageText;
  const sender = [message?.sender?.userName, message?.sender?.userId];
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
              <button
                onClick={() => reply(messageText, sender)}
                className="bg-gray-200 border border-gray-400 p-1.5 rounded-full active:scale-95 hover:bg-gray-200 duration-300 tooltip absolute top-[50%] -translate-y-[50%] -left-[40px]"
                data-tip="reply"
              >
                <MdOutlineReply className="text-lg" />
              </button>
            </div>
          </div>
        </div>
        {/* message */}
      </div>
    </div>
  );
};

MyChatCard.propTypes = {
  message: PropTypes.shape({
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
  reply: PropTypes.func.isRequired, 
};

export default MyChatCard;
