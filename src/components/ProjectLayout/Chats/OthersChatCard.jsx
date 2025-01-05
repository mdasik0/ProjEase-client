import PropTypes from "prop-types";
import { LuReplyAll } from "react-icons/lu";

const OthersChatCard = ({message}) => {
    return (
        <div className="chat-card-container block max-w-[50%] min-w-[10%]">
                <div className="w-fit">
        
                    <div className="avatar&time flex items-end justify-between ">
                      <div className="user-avatar w-8 h-8 rounded-full bg-blue-500"></div>
                      <div className="time text-xs">12:30 am</div>
                    </div>
        
                    <div className="message-actions-container relative">
                      {" "}
                      <p className="message text-[15px] bg-gray-200  p-2 px-3.5 rounded-xl rounded-tl-none mt-2">{message} </p>
                      <div className="replyandActions">
                        <button
                          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 duration-300 tooltip absolute top-[50%] -translate-y-[50%] -right-[40px]"
                          data-tip="reply"
                        >
                          <LuReplyAll />
                        </button>
                      </div>
                    </div>
                </div>
              </div>
    );
};

OthersChatCard.propTypes = ({
  message: PropTypes.string, 
})

export default OthersChatCard;