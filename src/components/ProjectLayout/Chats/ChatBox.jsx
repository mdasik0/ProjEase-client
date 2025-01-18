import OthersChatCard from "./OthersChatCard";
import MyChatCard from "./MyChatCard";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import SendChatMessage from "./SendChatMessage";
const ChatBox = ({ socket, userId, groupId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (groupId) {
      fetch(`http://localhost:5000/messages/${groupId}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMessages(data)
      })
      .catch((err) => {
          setLoading(false);
          toast.error(err.message)
        });
    }
    socket.on("groupMessageReceived", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on("error", (data) => {
      toast.error(data.message);
    });
    return () => {
      socket.off("groupMessageReceived");
      socket.off("error");
      setLoading(false);
    };
  }, [groupId, socket]);

  return (
    <div className="flex-grow scrollbar ms-8 me-4 pr-3 overflow-y-scroll overflow-x-hidden flex flex-col gap-2 justify-end">
      {loading ? (
        <div className=" h-full flex justify-center items-center" ><span className="loading loading-bars loading-lg"></span></div>
      ) : (
        messages.map((message, index) =>
          message.sender?.userId === userId ? (
            <MyChatCard key={index} message={message} />
          ) : (
            <OthersChatCard
              key={index}
              message={message}
              image={message?.sender?.image}
            />
          )
        )
      )}
      <SendChatMessage
        groupId={groupId}
        senderId={userId}
        socket={socket}
      />
    </div>
  );
};

ChatBox.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func,
    off: PropTypes.func,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  groupId: PropTypes.string,
};

export default ChatBox;
