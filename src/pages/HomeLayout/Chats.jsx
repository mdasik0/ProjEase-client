import { useEffect, useState } from "react";
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
    //users registration
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

    //group registration
    if (projectData?._id) {
      socket.emit("joinGroup", projectData?._id);
    }

    socket.on("groupJoinResponse", (data) => {
      console.log(data);
      toast.success(data.message);
    });

    socket.on("error", (data) => {
      toast.error(data.message);
    });

    return () => {
      socket.off("registerResponse");
      socket.off("groupJoinResponse");
      socket.off("error");
    };
  }, [projectData?._id]); // Add projectData in the dependency array

  const membersIDs = projectData?.members?.map((m) => m.userId);

  const { data: members } = useGetMultiUserQuery(membersIDs);

  const openChatSettingModal = () => {};

  return (
    <div className=" w-screen h-screen flex flex-col">
      <ChatsHeader
        openChatSettingModal={openChatSettingModal}
        projectData={projectData}
        members={members}
      />
      <ChatBox socket={socket} />
      <SendChatMessage groupChatId={projectData?._id} socket={socket} />
    </div>
  );
};

export default Chats;
