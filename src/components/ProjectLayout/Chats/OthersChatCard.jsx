import PropTypes from "prop-types";
import { MdOutlineReply } from "react-icons/md";

const OthersChatCard = ({ message,image }) => {
  console.log(message);
  return (
    <div className="w-full group">
      <div className="chat-card-container block max-w-[50%] min-w-[10%] group ">
      <div className="w-fit flex items-center gap-3">
        <div className="avatar">
          <div className="user-avatar w-8 h-8 rounded-full bg-blue-500">
            <img src={image} alt="member avatar" />
          </div>
        </div>

        <div className="message-actions-container relative">
          <p className="message text-[15px] bg-gray-200  p-2 px-3.5 rounded-xl rounded-tl-none">
            {message?.msgObj?.messageText}
          </p>
          <div className="replyandActions opacity-0 group-hover:opacity-100 duration-300">
            <button
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 duration-300 tooltip absolute top-[50%] -translate-y-[50%] -right-[40px]"
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
  message: PropTypes.string,
  image: PropTypes.string,
};

export default OthersChatCard;
