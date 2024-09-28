import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoAtSharp } from "react-icons/io5";
import { IoMdUnlock } from "react-icons/io";

const JoinProject = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const backdrop = document.querySelector(".modal-black-backdrop");
      backdrop.classList.add("add-modal-black-backdrop");
    }
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    const backdrop = document.querySelector(".modal-black-backdrop");
    backdrop.classList.remove("add-modal-black-backdrop");
    backdrop.classList.add("remove-modal-black-backdrop");
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };
  return (
    <div className="w-screen h-screen flex justify-center relative items-center roboto">
      <button
        onClick={openModal}
        className="bg-gray-200 px-6 py-2 rounded-full hover:bg-gray-300 shadow-sm shadow-black duration-300 active:shadow-none "
      >
        Click Me
      </button>
      {isOpen && (
        <div className="modal-black-backdrop  w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.36)] p-10">
          <div className="w-full h-full animate-modal-box bg-white border-4 rounded-3xl border-gray-200">
            <div className="close pt-5 cursor-pointer absolute right-6">
              <CiCircleRemove
                className="text-5xl text-red-500 hover:text-white duration-500 hover:bg-red-500 rounded-full"
                onClick={closeModal}
              />
            </div>
            <div className="px-8 pt-5">
              <h1 className="text-[2rem] text-black">Join Project</h1>
              <p className="text-gray-600">
                Please enter your project uid and password to join a project.
              </p>
            </div>
            <form className="px-8 py-3">
              <div className="mb-3.5">
                <label className="text-sm" htmlFor="uid">
                  Project UID
                </label>
                <div className="border  border-gray-500 px-2 py-2 w-1/3 rounded-lg bg-white flex items-center gap-1">
                  <IoAtSharp className="text-2xl text-gray-500" />
                  <input
                    name="uid"
                    className="bg-transparent focus:outline-none w-full"
                    type="text"
                    placeholder="Enter your project uid"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm" htmlFor="password">
                  Password
                </label>
                <div className="border border-gray-500 px-2 py-2 w-1/3 rounded-lg bg-white flex items-center gap-1">
                  <IoMdUnlock className="text-2xl text-gray-500" />
                  <input
                    name="password"
                    className="bg-transparent focus:outline-none w-full"
                    type="password"
                    placeholder="Enter your project password"
                  />
                </div>
              </div>
              <img
                className="absolute right-10 bottom-10"
                src={avatarImg}
                alt="an image of a woman pointing toward the join project form"
              />
              <button
                className="bg-black text-white hover:bg-white hover:text-black rounded-lg duration-300 px-4 py-2 mt-5 border border-black"
                type="submit"
              >
                Join Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinProject;
