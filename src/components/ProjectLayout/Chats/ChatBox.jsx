import OthersChatCard from "./OthersChatCard";
import MyChatCard from "./MyChatCard";

const ChatBox = () => {
  return (
    <div className="flex-grow scrollbar ms-8 me-4 pr-3 overflow-y-scroll overflow-x-hidden">
      <OthersChatCard />
      <MyChatCard />
    </div>
  );
};

export default ChatBox;
