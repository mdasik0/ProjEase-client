import PropTypes from "prop-types";
import { MdOutlineReply } from "react-icons/md";

const MyChatCard = ({ message }) => {
  return (
    <div className="flex flex-row-reverse items-end group">
      <div className="chat-card-container flex justify-end max-w-[50%] min-w-[10%] ">
        <div className="w-fit">
          <div className="message-actions-container relative">
            <p className="message text-[15px] bg-blue-400 text-white  p-2 px-3.5 rounded-xl rounded-br-none mt-2">
              {message}
            </p>
            <div className="replyandActions opacity-0 group-hover:opacity-100 duration-300">
              <button
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 duration-300 tooltip absolute top-[50%] -translate-y-[50%] -left-[40px]"
                data-tip="reply"
              >
                <MdOutlineReply className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyChatCard.propTypes = {
  message: PropTypes.string,
};

export default MyChatCard;
