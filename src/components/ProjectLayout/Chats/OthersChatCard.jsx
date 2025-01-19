import PropTypes from "prop-types";
import { MdOutlineReply } from "react-icons/md";

const OthersChatCard = ({ message,image,reply }) => {
  // console.log(message);
  const messageText = message?.msgObj?.messageText;
  const sender = [message?.sender?.userName, message?.sender?.userId];
  return (
    <div className="w-full group">
      <div className="chat-card-container block max-w-[50%] min-w-[10%] group ">
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
      <div className="w-fit flex items-center gap-3">
        <div className="avatar">
          <div className="user-avatar w-8 h-8 rounded-full bg-blue-500">
            <img src={image} alt="member avatar" />
          </div>
        </div>

        <div className="message-actions-container relative">
          <p className="message text-[15px] bg-gray-200  p-2 px-3.5 rounded-xl rounded-tl-none">
            {messageText}
          </p>
          <div className="replyandActions opacity-0 group-hover:opacity-100 duration-300">
            <button
               onClick={() => reply(messageText, sender)}
              className="bg-gray-200 p-2 rounded-full active:scale-95 hover:bg-gray-300 duration-300 tooltip absolute top-[50%] -translate-y-[50%] -right-[40px]"
              data-tip="reply"
            >
              <MdOutlineReply />
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

OthersChatCard.propTypes = {
  message: PropTypes.shape({
      msgObj: PropTypes.shape({
        messageText: PropTypes.string,
      })
    }),
  image: PropTypes.string,
};

export default OthersChatCard;
