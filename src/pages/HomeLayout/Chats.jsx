import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import ChatsHeader from "../../components/ProjectLayout/Chats/ChatsHeader";
import { useGetMultiUserQuery } from "../../redux/api/userApi";
import ChatBox from "../../components/ProjectLayout/Chats/ChatBox";

const socket = io("http://localhost:5000");

const Chats = () => {
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { projectData } = useSelector((state) => state.projectSlice);
  const { userData } = useSelector((state) => state.userSlice);
  // useEffect(() => {
  //   if (userData?._id) {
  //     socket.emit("register", userData?._id);
  //   }

  //   socket.on("registerResponse", (data) => {
  //     if (data.success) {
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   });

  //   if (projectData?._id) {
  //     socket.emit("joinGroup", projectData?._id);
  //   }

  //   socket.on("groupJoinResponse", (data) => {
  //     console.log(data);
  //     toast.success(data.message);
  //   });

  //   socket.on("groupMessageReceived", (data) => {
  //     console.log(data);
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //   });

  //   socket.on("error", (data) => {
  //     toast.error(data.message);
  //   });

  //   return () => {
  //     socket.off("registerResponse");
  //     socket.off("groupJoinResponse");
  //     socket.off("groupMessageReceived");
  //     socket.off("error");
  //   };
  // }, [projectData?._id]); // Add projectData in the dependency array

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

  const membersIDs = projectData?.members?.map((m) => m.userId);

  const { data: members } = useGetMultiUserQuery(membersIDs);
  // console.log(data);

  const openChatSettingModal = () => {};

  return (
    <div className=" w-screen h-screen flex flex-col">
      <ChatsHeader openChatSettingModal={openChatSettingModal} projectData={projectData} members={members} />
      <ChatBox />
      <div className='m-6'>
      <input type="text" placeholder="Type here" className="input input-bordered focus:outline-none border-gray-500 placeholder:text-gray-600 min-w-full max-w-xs" />
      
      </div>
    </div>
  );
};

export default Chats;
