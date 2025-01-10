import OthersChatCard from "./OthersChatCard";
import MyChatCard from "./MyChatCard";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
const ChatBox = ({socket, userId}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("groupMessageReceived", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on("error", (data) => {
      toast.error(data.message);
    });
    return () => {
      socket.off("groupMessageReceived")
      socket.off("error")
    }
  })

  console.log(messages[0]?.sender?.userId);

  return (
    <div className="flex-grow scrollbar ms-8 me-4 pr-3 overflow-y-scroll overflow-x-hidden flex flex-col gap-2 justify-end">
      {
        messages.map((message, index) => (message.sender?.userId === userId) ? <MyChatCard key={index} message={message} /> : <OthersChatCard key={index} message={message} image={message?.sender?.image} />)
      }
      
      
    </div>
  );
};

ChatBox.propTypes = ({
  socket: PropTypes.shape({
      emit: PropTypes.func.isRequired,
      on: PropTypes.func,
      off: PropTypes.func,
    }).isRequired,
    userId: PropTypes.string.isRequired,
})

export default ChatBox;
