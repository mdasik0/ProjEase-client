import { FaTelegramPlane } from "react-icons/fa";
import TitleandSub from "../../components/ProjectLayout/TitleandSub";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useInviteMembersMutation } from "../../redux/api/projectsApi";
import emailjs from "@emailjs/browser";
const InviteMembers = () => {
  const [emails, setEmails] = useState(["", "", ""]);
  const { userData } = useSelector((state) => state.userSlice);
  const { projectData } = useSelector((state) => state.projectSlice);
  const [inviteMembers, { isLoading }] = useInviteMembersMutation();

  
  const handleSendInvitations = async (e) => {
    e.preventDefault();
    if (!emails[0] && !emails[1] && !emails[2]) {
      return toast.error("No emails available to send invitation");
    }
    const emptyEmails = emails.filter((e) => e.length !== 0);

    const invitationInfo = emptyEmails.map((email) => ({
      email: email,
      senderName: userData?.name,
      projectId: projectData?._id,
      isPrivate: projectData?.isPrivate,
      isUsed: false,
      projectName: projectData?.projectName,
      sentDate: Date.now(),
    }));
    try {
      const response = await inviteMembers(invitationInfo);
      if (response.data) {
        const emailReadyObjs = invitationInfo.map((obj, index) => {
          return { ...obj, tokenId: response.data.insertedIds[index] };
        });

        emailReadyObjs.forEach((obj) => {
          sendEmail(obj);
        });
      }
      if (response.error) {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEmails(["", "", ""]);
      document
        .querySelectorAll(".invite-member-email-inputs")
        .forEach((i) => (i.value = ""));
    }
  };

  const sendEmail = (obj) => {
    const sender = obj.senderName.firstname + " " + obj.senderName.lastname;
    const recieverName = obj.email.split("@")[0];
    const baseUrl = import.meta.env.VITE_BASEURL;
    const tokenUrl = `/join-project/token=${obj.tokenId}`;
    const invitationLink = baseUrl + tokenUrl;


    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID , // Use your environment variable for the service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID  , // Use your environment variable for the template ID
        {
          reciever_name: recieverName,
          invitation_link: invitationLink,
          reply_to: obj.email,
          sender_name: sender,
          project_name: obj.projectName,
          today: new Date(obj.sentDate).toLocaleString(), 
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Use your environment variable for the public key
      )
      .then(
        (result) => {
          if (result.status == 200) {
            console.log(`Email successfully sent to ${obj.email}`);
            toast.success(`Invitation sent to ${obj.email}`);
          }
        },
        (error) => {
          console.error(`Failed to send email to ${obj.email}`, error.text);
          toast.error(`Failed to send invitation to ${obj.email}`);
        }
      );
  };

  return (
    <div className="w-screen h-screen p-10">
      <TitleandSub
        title={"Invite members"}
        subTitle={"Enter emails to send invitation."}
      />
      <form onSubmit={handleSendInvitations} className="">
        <p className="mb-5 font-[500]">Send invitation{"'"}s</p>
        {[
          "Enter Email address 1",
          "Enter Email address 2",
          "Enter Email address 3",
        ].map((placeholder, index) => (
          <label
            key={index}
            className="input focus-within:outline-gray-400 border-gray-400 mb-6 max-w-sm flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              onChange={(e) => {
                const updatedEmails = [...emails];
                updatedEmails[index] = e.target.value;
                setEmails(updatedEmails);
              }}
              type="email"
              className="invite-member-email-inputs w-full"
              placeholder={placeholder}
            />
          </label>
        ))}
        <button
          type="submit"
          className="btn text-gray-200 bg-[#1a1a1a] hover:text-black w-[24rem]  font-normal"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              Send invitation <FaTelegramPlane className="text-lg" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default InviteMembers;
