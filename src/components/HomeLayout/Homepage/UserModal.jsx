import { useState } from "react";
import imageCompression from "browser-image-compression";
import Modal from "../../Shared/Modal";
import PropTypes from "prop-types";
import { FiEdit, FiLogOut } from "react-icons/fi";
import {
  logoutUser,
  updateFirebaseUser,
} from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { TbCameraPlus } from "react-icons/tb";
import { FaExclamationCircle } from "react-icons/fa";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userApi";
import toast from "react-hot-toast";
import { fullDate } from "../../../utils/getDate";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const UserModal = ({ userInfo, user }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState({ loading: "", state: false });
  const { name, email } = userInfo;
  const { data } = useGetUserQuery(email);
  const [updateUser] = useUpdateUserMutation();
  const [imageState, setImageState] = useState({
    imgFile: "",
    previewImg: "",
    hostedUrl: "",
  });
  const [nameState, setNameState] = useState({
    name: data?.name,
    changed: false,
  });
  const [phoneState, setPhoneState] = useState({
    phone: data?.phoneNumber,
    changed: false,
  });

  // edit on/off function
  const handleEdit = (value) => {
    if (data?.method === "google") {
      return;
    } else if (value === false) {
      saveChanges(value);
      // setEdit(value);
    } else {
      setEdit(value);
    }
  };

  //first state handle
  //edit the new input fields handle them
  const changeName = (e) => {
    e.preventDefault();
    const newName = e.target.value;
    if (newName !== name) {
      setNameState({ name: newName, changed: true });
    } else if (newName === name) {
      setNameState({ name: name, changed: false });
    }
  };
  const changePhoneNumber = (e) => {
    e.preventDefault();
    const newPhoneNumber = e.target.value;

    if (newPhoneNumber !== data?.phoneNumber) {
      setPhoneState({ phone: newPhoneNumber, changed: true });
    } else if (newPhoneNumber === data?.phoneNumber) {
      setPhoneState({ phone: data?.phoneNumber, changed: false });
    }
  };
  const changeProfilePicture = (e) => {
    e.preventDefault();
    // get the new image file
    const File = e.target.files[0];
    // if there is no image file return from this function
    if (!File) {
      return;
    }
    // get a preview image so that you can show the user directly which image the user choose
    const previewImg = URL.createObjectURL(File);
    //now set these images to state
    setImageState((prevState) => ({ ...prevState, imgFile:File, previewImg }));
  };

  // console.log("nameState", nameState);
  // console.log("phoneState", phoneState);
  // console.log("imageState", imageState);

  // now save the new Changes
  const saveChanges = async () => {
    try {
      // Ensure the image is uploaded first
      if (!imageState.hostedUrl && imageState.imgFile) {
        const uploadedUrl = await imageSizeFixingAndHosting(imageState.imgFile);
        if (!uploadedUrl) {
          toast.error("Failed to upload the image");
          return;
        }
        setImageState((prevState) => ({ ...prevState, hostedUrl: uploadedUrl }));
      }
  
      if (imageState.hostedUrl || nameState.changed || phoneState.changed) {
        // Dispatch the Firebase update and await its result
        const resultAction = await dispatch(
          updateFirebaseUser({
            name: nameState.name,
            image: imageState.hostedUrl,
          })
        );
  
        if (updateFirebaseUser.fulfilled.match(resultAction)) {
          toast.success("User has been updated in Firebase");
  
          // Proceed to update the backend database
          const updatedUserData = {
            ...data,
            name: nameState.name,
            phoneNumber: phoneState.phone,
            image: imageState.hostedUrl,
            lastUpdated: fullDate,
          };
  
          // console.log(imageState);
          const result = await updateUser({
            _id: data._id,
            data: updatedUserData,
          }).unwrap();
  
          toast.success(result.message);
          resetEverything();
          setEdit(false);
        } else {
          toast.error("There was an error updating the user. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Error saving changes. Please try again.");
    }
  };
  
  

  // This function compresses and uploads an image to Imgbb
const imageSizeFixingAndHosting = async (imgfile) => {
  try {
    // Check if the input is a valid Blob or File instance
    if (!(imgfile instanceof Blob || imgfile instanceof File)) {
      console.error("The file is not an instance of Blob or File:", imgfile);
      return null; // Early return if the file is invalid
    }

    // Define compression options to target 30KB
    const options = {
      maxSizeMB: 0.03, // 30KB max size
      maxWidthOrHeight: 800, // Optional: Resize the image to reduce size, adjust based on your needs
      useWebWorker: true, // For faster compression
    };

    // Compress the image
    const compressedFile = await imageCompression(imgfile, options);
    console.log("Compressed file:", compressedFile);

    // Check the compressed file size
    const compressedSizeInKB = compressedFile.size / 1024;
    console.log(`Compressed file size: ${compressedSizeInKB.toFixed(2)} KB`);

    // Ensure file size is less than or equal to 30KB
    if (compressedSizeInKB > 30) {
      console.error(
        "Compressed file exceeds 30KB, please try a smaller image."
      );
      return null; // Return or handle the error accordingly
    }

    // Prepare the image for uploading (convert to base64)
    const base64Image = await imageCompression.getDataUrlFromFile(
      compressedFile
    );

    // Create FormData for the upload
    const formData = new FormData();
    formData.append("image", base64Image.split(",")[1]); // Removing the 'data:image/jpeg;base64,' part

    // Upload the image to Imgbb
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_apiKey
      }`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    // Check if the upload was successful
    if (result.success) {
      console.log("Image uploaded successfully:", result.data.url);
      setImageState((prevState) => ({ ...prevState, hostedUrl: result.data.url }));
      return result.data.url; // Return the hosted image URL
    } else {
      console.error("Image upload failed:", result);
      return null;
    }
  } catch (error) {
    console.error("Error during image compression or upload:", error);
    return null;
  }
};

//reset function
const resetEverything = () => {
  setImageState({
    imgFile: "",
    previewImg: "",
    hostedUrl: "",
  })
  setNameState({
    name: data?.name,
    changed: false,
  });
  setPhoneState({
    phone: data?.phoneNumber,
    changed: false,
  });
  setLoading({ loading: "", state: false });

}

  // cancel edit
  const cancelEdit = () => {
    resetEverything();
    setEdit(false);
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
            className="rounded-full h-full w-full object-cover hover:p-0.5 duration-500"
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
                  <div className="w-[80px] h-[80px]">
                    {edit ? (
                      <img
                        className="rounded-full border-[3px] object-cover w-full h-full  duration-500"
                        src={
                          imageState?.previewImg
                            ? imageState?.previewImg
                            : data?.image
                        }
                        alt="userImage"
                      />
                    ) : (
                      <img
                        className="rounded-full border-[3px] w-full h-full object-cover object-center duration-500"
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
                          imageState?.previewImg
                            ? imageState?.previewImg
                            : data?.image
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
                      onChange={changeProfilePicture}
                      className="z-20 opacity-0 cursor-pointer"
                      type="file"
                      placeholder="upload new profile picture"
                      name="profile-picture"
                      accept="image/jpeg, image/png"
                      id="profile-picture"
                      disabled={loading.state}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              {edit ? (
                <div className=" absolute top-2 right-2">
                  <button
                    title="Cancel Edit"
                    onClick={cancelEdit}
                    className=" p-1 rounded-full hover:bg-[#4b4b4b6b] duration-300"
                  >
                    <FaCircleXmark className="text-red-500 text-xl" />
                  </button>
                  <button
                    title="Done"
                    onClick={saveChanges}
                    className=" p-1 rounded-full hover:bg-[#4b4b4b6b] duration-300"
                  >
                    <FaCircleCheck className="text-green-500 text-xl" />
                  </button>
                </div>
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
                    onChange={changeName}
                  />
                  {nameState.changed && (
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
                    onChange={changePhoneNumber}
                  />
                  {phoneState.changed && (
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
    updateUserStatus: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    lastUpdated: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
  user: PropTypes.string.isRequired,
};

export default UserModal;
