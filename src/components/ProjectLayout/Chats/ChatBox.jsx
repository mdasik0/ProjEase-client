import OthersChatCard from "./OthersChatCard";
import MyChatCard from "./MyChatCard";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const ChatBox = ({ socket, userId, groupId, handleSendReply }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null); // Ref for the chat container

  useEffect(() => {
    setLoading(true);
    if (groupId) {
      fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/messages/${groupId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setMessages(data);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
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

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

   useEffect(() => {
      const handleDeleteMessageResponse = (data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      };
    
      socket.on('deleteMessageResponse', handleDeleteMessageResponse);
    
      return () => {
        socket.off('deleteMessageResponse', handleDeleteMessageResponse);
      };
    }, [socket]);

  return (
    <div
      ref={chatBoxRef}
      className="flex-grow ms-8 me-4 pr-3 overflow-y-scroll scrollbar overflow-x-hidden"
    >
      <div className="flex flex-col justify-end gap-2">
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : messages.length === 0 ? <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-260px)]">
            <h1 className="text-4xl block mb-3 text-gray-400">No message available</h1>
            <h3 className="text-lg font-[500] text-gray-400">Start a conversation <kbd>(ctrl + /)</kbd> </h3>
        </div> : (
          messages.map((message, index) =>
            message.sender?.userId === userId ? (
              <MyChatCard
                reply={handleSendReply}
                socket={socket}
                setMessages={setMessages}
                messages={messages}
                index={index}
                key={index}
                message={message}
              />
            ) : (
              <OthersChatCard
                reply={handleSendReply}
                index={index}
                key={index}
                message={message}
                image={message?.sender?.image}
              />
            )
          )
        )}
      </div>
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
  handleSendReply: PropTypes.func,
};

export default ChatBox;
