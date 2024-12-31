import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chats = () => {
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { projectData } = useSelector((state) => state.projectSlice);
  const { userData } = useSelector((state) => state.userSlice);
  useEffect(() => {
    if (userData?._id) {
      socket.emit("register", userData?._id);
    }

    socket.on("registerResponse", (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    });

    if(projectData?._id) {
      socket.emit("joinGroup",projectData?._id);
    }

    socket.on("groupJoinResponse", (data) => {
      console.log(data);
      toast.success(data.message);
    });

    socket.on("groupMessageReceived", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("error", (data) => {
      toast.error(data.message);
    });

    return () => {
      socket.off("registerResponse");
      socket.off("groupJoinResponse");
      socket.off("groupMessageReceived");
      socket.off("error");
    };
  }, [projectData?._id]); // Add projectData in the dependency array

  const handleUserRegister = () => {
    if (!userId) {
      return toast.error("User ID is required");
    }
    socket.emit("register", userId);
  };

  const handleJoinGroup = () => {
    if (!groupId) {
      return toast.error("Group ID is required");
    }
    socket.emit("joinGroup", groupId);
  };

  const handleSendGroupMessage = () => {
    if (message && projectData?._id) {
      // console.log('message', message);
      // console.log('group', projectData?._id);
      socket.emit("groupMessage", { groupId: projectData?._id, message });
      return setMessage(""); // Clear the message input
    }
    return toast.error("Group ID and message are required");
  };

  return (
    <div className="flex-grow p-10 flex gap-10 flex-col justify-center items-center">
      {/* User Registration */}
      <div className="flex flex-col gap-1 items-start">
        <label className="text-sm">User Register</label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-black p-1"
          type="text"
          placeholder="User ID"
        />
        <button
          onClick={handleUserRegister}
          className="p-1 bg-black text-white rounded"
        >
          Register
        </button>
      </div>

      {/* Group Join */}
      <div className="flex flex-col gap-1 items-start">
        <label className="text-sm">Join Group</label>
        <input
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="border border-black p-1"
          type="text"
          placeholder="Group ID"
        />
        <button
          onClick={handleJoinGroup}
          className="p-1 bg-black text-white rounded"
        >
          Join
        </button>
      </div>

      {/* Send Group Message */}
      <div className="flex flex-col gap-1 items-start">
        <label className="text-sm">Send Message</label>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-black p-1"
          type="text"
          placeholder="Message"
        />
        <button
          onClick={handleSendGroupMessage}
          className="p-1 bg-black text-white rounded"
        >
          Send
        </button>
      </div>

      {/* Messages */}
      <div>
        <p>Messages:</p>
        <div className="message-container">
          {messages.map((msg, index) => (
            <p key={index}>
              {msg?.sender}: {msg.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chats;
