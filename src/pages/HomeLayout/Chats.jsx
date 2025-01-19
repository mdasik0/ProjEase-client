import { useEffect, useMemo, useRef, useState } from "react";
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
  const [replyDetails, setReplyDetails] = useState({
    originalMessage: "",
    originalSender: [],
  });

  const userId=  userData?._id;

  const messageInputRef = useRef();

  useEffect(() => {
    const user = userData
      ? {
          userName: `${userData.name?.firstname || ""} ${
            userData.name?.lastname || ""
          }`.trim(),
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

    socket.on("User-disconnected", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("registerResponse");
      socket.off("groupJoinResponse");
      socket.off("userLeftGroup");
      socket.off("error");
    };
  }, [projectData?.ChatId, userData, projectData?.members]);

  const membersIDs = useMemo(() => {
    return projectData?.members?.map((m) => m.userId);
  }, [projectData]);

  const { data: members } = useGetMultiUserQuery(membersIDs, {
    skip: !membersIDs,
  });

  const handleSendReply = (message, sender) => {
    console.log("open send message input", message);
    setReplyDetails({ originalMessage: message, originalSender: sender });
    messageInputRef.current.focus();
  };

  const cancelReply = () => {
    setReplyDetails({ originalMessage: "", originalSender: [] });
  };

  const openChatSettingModal = () => {
    
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <ChatsHeader
        openChatSettingModal={openChatSettingModal}
        projectData={projectData}
        members={members}
      />
      <ChatBox
        handleSendReply={handleSendReply}
        socket={socket}
        userId={userData?._id}
        groupId={projectData?.ChatId}
        />
      <SendChatMessage
        setReplyDetails={setReplyDetails}
      currentUserId={userId}
        replyDetails={replyDetails}
        messageInputRef={messageInputRef}
        groupId={projectData?.ChatId}
        senderId={userData?._id}
        socket={socket}
        cancelReply={cancelReply}
      />
    </div>
  );
};

export default Chats;
