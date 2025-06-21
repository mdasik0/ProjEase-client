import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import ChatsHeader from "../../components/ProjectLayout/Chats/ChatsHeader";
import { useGetMultiUserQuery } from "../../redux/api/userApi";
import ChatBox from "../../components/ProjectLayout/Chats/ChatBox";
import SendChatMessage from "../../components/ProjectLayout/Chats/SendChatMessage";
import toast from "react-hot-toast";

// Move socket initialization inside component to avoid connection issues
const Chats = () => {
  const { projectData } = useSelector((state) => state.projectSlice);
  const { userData } = useSelector((state) => state.userSlice);
  const [replyDetails, setReplyDetails] = useState({
    originalMessage: "",
    originalSender: [],
  });
  
  // Add socket ready state
  const [isSocketReady, setIsSocketReady] = useState(false);
  const socketRef = useRef(null);
  const userId = userData?._id;
  const messageInputRef = useRef();

  // Initialize socket connection
  useEffect(() => {
    if (import.meta.env.VITE_BACKEND_BASEURL) {
      // Always create a new socket when component mounts
      socketRef.current = io(import.meta.env.VITE_BACKEND_BASEURL, {
        transports: ["polling", "websocket"],
        upgrade: true,
        rememberUpgrade: true,
        timeout: 10000,
        forceNew: false,
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      // Connection event handlers
      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
        setIsSocketReady(true); // Set ready state
      });

      socketRef.current.on("connect_error", (error) => {
        console.log("Socket connection error:", error.message);
        setIsSocketReady(false);
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        setIsSocketReady(false);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsSocketReady(false); // Reset ready state
      }
    };
  }, []); // Removed condition from dependency array

  useEffect(() => {
    if (!socketRef.current || !userData) return;

    const socket = socketRef.current;
    
    const user = {
      userName: `${userData.name?.firstname || ""} ${
        userData.name?.lastname || ""
      }`.trim(),
      userId: userData?._id,
      image: userData?.image || null,
      jobTitle: userData?.jobTitle || null,
    };

    // Register user
    socket.emit("register", user);

    // Join group if ChatId exists
    if (projectData?.ChatId) {
      socket.emit("joinGroup", projectData.ChatId);
    }

    // Event listeners
    const handleRegisterResponse = (data) => {
      // Only show error toasts, skip success messages to reduce noise
      if (!data.success) {
        toast.error(data.message);
      }
    };

    const handleGroupJoinResponse = (data) => {
      // Remove join success toast - it's annoying when navigating back
      console.log(`Joined the group "${data.groupId}" successfully.`);
    };

    const handleError = (data) => {
      toast.error(data.message || "An unexpected error occurred.");
    };

    const handleUserDisconnected = (data) => {
      console.log("User disconnected:", data);
    };

    // Add event listeners
    socket.on("registerResponse", handleRegisterResponse);
    socket.on("groupJoinResponse", handleGroupJoinResponse);
    socket.on("error", handleError);
    socket.on("User-disconnected", handleUserDisconnected);

    // Cleanup function
    return () => {
      socket.off("registerResponse", handleRegisterResponse);
      socket.off("groupJoinResponse", handleGroupJoinResponse);
      socket.off("error", handleError);
      socket.off("User-disconnected", handleUserDisconnected);
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

  const openChatSettingModal = () => {};

  // Add this useEffect to your Chats component (after messageInputRef is defined)
useEffect(() => {
  const handleKeyboardShortcut = (event) => {
    // Check for Ctrl + / (or Cmd + / on Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault();
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }
  };

  document.addEventListener('keydown', handleKeyboardShortcut);

  return () => {
    document.removeEventListener('keydown', handleKeyboardShortcut);
  };
}, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <ChatsHeader
        openChatSettingModal={openChatSettingModal}
        projectData={projectData}
        members={members}
      />
      
      {isSocketReady && (
        <ChatBox
          handleSendReply={handleSendReply}
          socket={socketRef.current}
          userId={userData?._id}
          groupId={projectData?.ChatId}
        />
      )}
      {isSocketReady && (
        <SendChatMessage
          setReplyDetails={setReplyDetails}
          currentUserId={userId}
          replyDetails={replyDetails}
          messageInputRef={messageInputRef}
          groupId={projectData?.ChatId}
          senderId={userData?._id}
          socket={socketRef.current}
          cancelReply={cancelReply}
        />
      )}

    </div>
  );
};

export default Chats;

