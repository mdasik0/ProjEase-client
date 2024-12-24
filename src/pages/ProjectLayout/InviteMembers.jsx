import { FaTelegramPlane } from "react-icons/fa";
import TitleandSub from "../../components/ProjectLayout/TitleandSub";
import { useState } from "react";

const InviteMembers = () => {
  const [emails, setEmails] = useState({ email1: "", email2: "", email3: "" });

  const isLoading = false;

  const handleSendInvitations = (e) => {
    e.preventDefault();
    console.log(emails);
  };
  return (
    <div className="w-screen h-screen p-10">
      <TitleandSub
        title={"Invite members"}
        subTitle={"Enter emails to send invitation."}
      />
      <form onSubmit={handleSendInvitations} className="">
        <p className="mb-5 font-[500]">Send invitation{"'"}s</p>
        <label className="input focus-within:outline-gray-400 border-gray-400 mb-6 max-w-sm flex items-center gap-2">
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
            onChange={(e) => setEmails({ ...emails, email1: e.target.value })}
            type="email"
            className=""
            placeholder="Enter Email address 1"
          />
        </label>
        <label className="input focus-within:outline-gray-400 border-gray-400 mb-6 max-w-sm flex items-center gap-2">
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
            onChange={(e) => setEmails({ ...emails, email2: e.target.value })}
            type="email"
            className=""
            placeholder="Enter Email address 2"
          />
        </label>
        <label className="input focus-within:outline-gray-400 border-gray-400 mb-6 max-w-sm flex items-center gap-2">
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
            onChange={(e) => setEmails({ ...emails, email3: e.target.value })}
            type="email"
            className=""
            placeholder="Enter Email address 3"
          />
        </label>
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
