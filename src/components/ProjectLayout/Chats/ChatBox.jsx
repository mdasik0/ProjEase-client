import { LuReplyAll } from "react-icons/lu";

const ChatBox = () => {
  return (
    <div className="flex-grow scrollbar mx-8 overflow-y-scroll">
      <div className="chat-card-container max-w-[45%] min-w-[10%]">
        <div className="avatar&time flex items-end justify-between ">
          <div className="user-avatar w-8 h-8 rounded-full bg-blue-500">
          </div>
          <div className="time text-xs">
            12:30 am 
          </div>
        </div>
        <div className="message text-[15px] bg-gray-200 w-fit p-2 px-3.5 rounded-xl rounded-tl-none mt-2">
            Lorem ipsum dolor sit amet, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores pariatur distinctio placeat totam quibusdam culpa expedita rem quisquam veritatis ut.
        </div>
        <div className="reply&Action mt-3">
            <button className="bg-gray-200 px-3 pe-4 py-1 rounded-full flex items-center gap-2"> <LuReplyAll />Reply</button>
            <button></button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
