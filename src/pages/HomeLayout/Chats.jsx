import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Chats = () => {
  const [userId, setUserId] = useState('')
  const [groupId, setGroupId] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("joinGroup", () => {});

    socket.on("user_not_found", (data) => {
      alert(`${data.recipientId} is not online: ${data.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex-grow p-10 flex gap-10 flex-col justify-center items-center">
      <div className="flex flex-col gap-1 items-start">
        <label className="text-sm" htmlFor="">join group</label>
        <input
          onChange={(e) => setGroupId(e.target.value)}
          className="border border-black p-1"
          type="text"
          placeholder="join group"
          />
        <button className="p-1 bg-black text-white rounded cursor-pointer">Enter</button>
      </div>

      <div className="flex flex-col gap-1 items-start">
        <label className="text-sm" htmlFor="">user register</label>
        <input
          onChange={(e) => setUserId(e.target.value)}
          className="border border-black p-1"
          type="text"
          placeholder="user register"
          />
        <button className="p-1 bg-black text-white rounded cursor-pointer">Enter</button>
      </div>

      <div className="flex flex-col gap-1 items-start">
        <label className="text-sm" htmlFor="">send message</label>
        <input
          onChange={(e) => setMessage(e.target.value)}
          className="border border-black p-1"
          type="text"
          placeholder="send message"
        />
        <button className="p-1 bg-black text-white rounded cursor-pointer">Enter</button>
      </div>

      <div>
        <p> messages :</p>
        <div className="message-container"></div>
      </div>
    </div>
  );
};

export default Chats;
