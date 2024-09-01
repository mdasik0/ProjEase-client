import { useState } from "react";
import Modal from "../../Shared/Modal";
import PropTypes from "prop-types";
import { FiEdit, FiLogOut } from "react-icons/fi";
import {
  logoutUser,
  updateFirebaseUser,
} from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TbCameraPlus } from "react-icons/tb";
import { FaExclamationCircle } from "react-icons/fa";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";
import { fullDate } from "../../../utils/getDate";

const UserModal = ({ userInfo, user }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState({ loading: "", state: false });
  const { name, email } = userInfo;
  const { data } = useGetUserQuery(email);
  const [ppChange, setPpChange] = useState({
    img: "",
    previewImg: "",
    imgbbUrl: "",
  });
  const [nameChange, setNameChange] = useState({ name: data?.name, changed: false });
  const [phoneChange, setPhoneChange] = useState({
    phone: data?.phoneNumber,
    changed: false,
  });
  const [updateUser] = useUpdateUserMutation();

  // functions

  // handling edit state
  const handleEdit = (value) => {
    if (data?.method === "google") {
      return;
    } else if (value === false) {
      handleEditComplete(value);
      // setEdit(value);
    } else {
      setEdit(value);
    }
  };

  // changing profile picture
  const handleChangeProfilePicture = (e) => {
    e.preventDefault();
    const imgFile = e.target.files[0];
    if (!imgFile) {
      return;
    }
    const previewUrl = URL.createObjectURL(imgFile);
    setPpChange({ img: imgFile, previewImg: previewUrl });
  };

  // uploading img to imgbb
  const uploadToImgbb = async (imgFile) => {
    setLoading({ text: "Uploading to imgbb...", state: true });
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_apiKey
        }`,
        {
          method: "POST",
          body: imgFile,
        }
      );
      const data = await response.json();
      // console.log(data.data.url);
      setLoading({ ...loading, text: "Uploading Complete &#10003;" });
      setLoading({ text: "", state: false });
      return setPpChange({ ...ppChange, imgbbUrl: data.data.url });
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const NameChange = (e) => {
    e.preventDefault();
    const newName = e.target.value;
    if (newName !== name) {
      setNameChange({ name: newName, changed: true });
    } else if (newName === name) {
      setNameChange({ name: name, changed: false });
    }
  };

  const PhoneNumberChange = (e) => {
    e.preventDefault();
    const newPhoneNumber = e.target.value;

    if (newPhoneNumber !== data?.phoneNumber) {
      setPhoneChange({ phone: newPhoneNumber, changed: true });
    } else if (newPhoneNumber === data?.phoneNumber) {
      setPhoneChange({ phone: data?.phoneNumber, changed: false });
    }
  };

  // console.log(data);

  const handleEditComplete = (value) => {
    try {
      // Upload image and get URL
      uploadToImgbb(ppChange.img);

      // Update Firebase user profile
      setLoading({text:"updating Firebase user profile", state:true})
      if (nameChange.changed) {
        dispatch(
          updateFirebaseUser({
            name: nameChange.name,
            image: ppChange.imgbbUrl,
          })
        ).unwrap();
      }
      setLoading({...loading,text:"Updating complete."})
      setLoading({...loading,text:"Sending data to backend."})
      
      // Update user in your database
      const userObj = {
        ...data,
        lastUpdated: fullDate,
        image: ppChange.imgbbUrl,
        name: nameChange.name,
        phoneNumber: phoneChange.phone,
      };
      
      const res = updateUser({ _id: data._id, data: userObj }).unwrap();
      setLoading({...loading,text:"Updating Done."})
      setLoading({text:"",state:false})
      setNameChange({...nameChange,changed: false})
      setPhoneChange({...phoneChange,changed: false})
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEdit(value);
    }
  };

  // handling logout
  const handleLogOut = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <div
        // onclick open profile modal in homepage
        onClick={() => setIsOpen(!isOpen)}
        title={user && userInfo?.name}
        className="cursor-pointer  w-11 h-11 rounded-full hover:border hover:border-black duration-500"
      >
        {data?.image ? (
          <img
            className="rounded-full hover:p-0.5 duration-500"
            src={data?.image}
            alt="userImage"
          />
        ) : (
          <span className="bg-green-500 hover:bg-green-600 active:scale-110 duration-500 rounded-full w-full h-full flex items-center justify-center text-white font-semibold">
            {data?.name?.charAt(0)?.toUpperCase()}
          </span>
        )}
      </div>

      {/* modal */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-1.5">
          {/* manual cover photo (not changeable) */}
          <div className="h-[150px] bg-blue-400 rounded-xl bg-[url('/header-cards1.png')] flex relative">
            {/* profile picture */}
            <div className="flex  justify-center items-center w-fit h-full ml-6">
              <div className="relative">
                {data?.image ? (
                  <div>
                    {edit ? (
                      <img
                        className="rounded-full border-[3px] w-[80px] h-[80px] duration-500"
                        src={
                          ppChange?.previewImg ? ppChange?.previewImg : data?.image
                        }
                        alt="userImage"
                      />
                    ) : (
                      <img
                        className="rounded-full border-[3px] w-[80px] h-[80px] duration-500"
                        src={data?.image}
                        alt="userImage"
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    {edit ? (
                      <img
                        className="rounded-full border-[3px] w-[80px] h-[80px] duration-500"
                        src={
                          ppChange?.previewImg ? ppChange?.previewImg : data?.image
                        }
                        alt="userImage"
                      />
                    ) : (
                      <span className="bg-green-500 hover:bg-green-600 active:scale-110 duration-500 w-[80px] h-[80px] rounded-full flex items-center justify-center text-white text-2xl border-[3px] font-semibold">
                        {data?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  // <span className="bg-green-500 hover:bg-green-600 active:scale-110 duration-500 w-[80px] h-[80px] rounded-full flex items-center justify-center text-white text-2xl border-[3px] font-semibold">
                  //   {data?.name?.charAt(0)?.toUpperCase()}
                  // </span>
                )}
                {edit && (
                  <div className="bg-white w-7 h-7 absolute bottom-0 right-0 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 duration-300 p-1 overflow-hidden">
                    <TbCameraPlus className="z-0 absolute" />
                    <input
                      onChange={handleChangeProfilePicture}
                      className="z-20 opacity-0 cursor-pointer"
                      type="file"
                      placeholder="upload new profile picture"
                      name="profile-picture"
                      id="profile-picture"
                      disabled={loading.state}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              {edit ? (
                <button
                  title="Done"
                  onClick={() => handleEdit(false)}
                  className=" p-1 rounded-full hover:bg-[#4b4b4b6b] duration-300 absolute top-2 right-2"
                >
                  <IoIosCheckmarkCircle className="text-green-500 text-xl" />
                </button>
              ) : (
                <button
                  title={
                    data?.method === "google"
                      ? "You can not edit profile with google login"
                      : "Edit"
                  }
                  onClick={() => handleEdit(true)}
                  className={
                    data?.method === "google"
                      ? `p-1 rounded-full hover:bg-[#4b4b4b6b] duration-300 absolute top-2 right-2 cursor-not-allowed`
                      : "p-1 rounded-full hover:bg-[#4b4b4b6b] duration-300 absolute top-2 right-2"
                  }
                >
                  <FiEdit className="text-white" />
                </button>
              )}
            </div>
            {loading.state === true && (
              <div className="absolute right-3 animate-pulse bottom-1.5 text-white text-sm italic flex items-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>{" "}
                <span>{loading.text}</span>
              </div>
            )}
          </div>
          {/* user information */}
          <div className="mx-3">
            <div className="flex justify-between items-center my-3">
              <h4 className="text-2xl font-semibold  text-black">
                {data?.name}
              </h4>
              <p className="text-sm italic w-[140px]">
                Last Updated:
                {data?.lastUpdated ? data?.lastUpdated : "__"}
              </p>
            </div>
            <div className=" mb-3">
              <p className="text-sm text-gray-600">Name</p>
              {edit ? (
                <div className="border rounded-md flex items-center">
                  <input
                    className="py-1.5 px-2 text-sm rounded-md w-full focus:outline-none "
                    type="text"
                    placeholder="Change Name"
                    defaultValue={data?.name}
                    onChange={NameChange}
                  />
                  {nameChange.changed && (
                    <FaExclamationCircle
                      title="Changed"
                      className="mr-2 text-red-500 cursor-pointer"
                    />
                  )}
                </div>
              ) : (
                <p className="text-black">{data?.name}</p>
              )}
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-600">Email</p>
              {edit ? (
                <div className="border hover:border-red-300 duration-300  rounded-md">
                  <input
                    title="You can not change the email"
                    readOnly
                    className="py-1.5 px-2 text-sm rounded-md w-full focus:outline-none bg-gray-100 cursor-not-allowed"
                    type="email"
                    placeholder="Change Email"
                    defaultValue={data?.email}
                  />
                </div>
              ) : (
                <p className="text-black">{data?.email}</p>
              )}
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-600">
                Phone <span className="text-gray-400 italic">(optional)</span>
              </p>
              {edit ? (
                <div className="border rounded-md flex items-center">
                  <input
                    className="py-1.5 px-2 text-sm rounded-md w-full focus:outline-none "
                    type="number"
                    placeholder="Change Phone Number"
                    defaultValue={data?.phoneNumber}
                    onChange={PhoneNumberChange}
                  />
                  {phoneChange.changed && (
                    <FaExclamationCircle
                      title="Changed"
                      className="mr-2 text-red-500 cursor-pointer"
                    />
                  )}
                </div>
              ) : (
                <p className="text-black">
                  {data?.phoneNumber ? (
                    data?.phoneNumber
                  ) : (
                    <span className="text-gray-500 italic">
                      (no phone number available)
                    </span>
                  )}
                </p>
              )}
            </div>
            {!edit && user && (
              <div
                className="bg-black hover:bg-stone-900 duration-300 text-white ps-5 pe-4 py-1.5 rounded-lg w-fit cursor-pointer mb-3 flex items-center gap-3"
                onClick={() => handleLogOut()}
              >
                {" "}
                Log out <FiLogOut />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

UserModal.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    lastUpdated: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
  user: PropTypes.string.isRequired,
};

export default UserModal;
