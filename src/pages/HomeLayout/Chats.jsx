import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chats = () => {
  console.log('hello world')
  useEffect(() => {

    socket.on("user_not_found", (data) => {
      alert(`${data.recipientId} is not online: ${data.message}`);
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection
    };
  }, []);

  return (
    <div className="flex-grow">
      <div className="w-full">here is your all the chats hello</div>
    </div>
  );
};

export default Chats;
