import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import ChatsHeader from "../../components/ProjectLayout/Chats/ChatsHeader";
import { useGetMultiUserQuery } from "../../redux/api/userApi";
import ChatBox from "../../components/ProjectLayout/Chats/ChatBox";
import SendChatMessage from "../../components/ProjectLayout/Chats/SendChatMessage";
import toast from "react-hot-toast";

const socket = io("http://localhost:5000");

const Chats = () => {
  const { projectData } = useSelector((state) => state.projectSlice);
  const { userData } = useSelector((state) => state.userSlice);

  

  useEffect(() => {
    const user = userData
      ? {
          userName: `${userData.name?.firstname || ""} ${userData.name?.lastname || ""}`.trim(),
          userId: userData?._id,
          image: userData?.image || null,
          jobTitle: userData?.jobTitle || null,
        }
      : null;

    if (user) {
      socket.emit("register", user);
    }

    if (projectData?.ChatId) {
      socket.emit("joinGroup", projectData.ChatId);
    }

    socket.on("registerResponse", (data) => {
      data.success
        ? toast.success(`Welcome, ${data.userName || "User"}!`)
        : toast.error(data.message);
    });
    
    socket.on("groupJoinResponse", (data) => {
      toast.success(`Joined the group "${data.groupId}" successfully.`);
    });

    socket.on("error", (data) => {
      toast.error(data.message || "An unexpected error occurred.");
    });

    socket.on("User-disconnected",data => {console.log(data)})
    return () => {

      socket.off("registerResponse");
      socket.off("groupJoinResponse");
      socket.off("userLeftGroup");
      socket.off("error");
    };
  }, [projectData?.ChatId, userData]);

  const membersIDs = projectData?.members?.map((m) => m.userId) || [];
  const { data: members } = useGetMultiUserQuery(membersIDs.length ? membersIDs : null);

  const openChatSettingModal = () => {};

  if (!projectData) {
    return <div className="w-screen h-screen flex flex-col">Loading project details...</div>;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <ChatsHeader
        openChatSettingModal={openChatSettingModal}
        projectData={projectData}
        members={members}
      />
      <ChatBox
        socket={socket}
        userId={userData?._id}
        groupId={projectData?.ChatId}
      />
      <SendChatMessage
        groupChatId={projectData?.ChatId}
        senderId={userData?._id}
        socket={socket}
      />
    </div>
  );
};

export default Chats;
