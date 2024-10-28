import logo from "/logo/Full-logo/logo-white-ov2.png";
import { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageToImgbb } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import { useUploadProfilePictureMutation } from "../../redux/api/userApi";
const Upload_your_profile_picture = () => {

  //TODO: redirect the user to an other page after profile picture has been uploaded 

  const [imageData, setImageData] = useState({
    selectedFile: null,
    previewURL: "",
    uploadedURL: ""
  });

  const [hover, setHover] = useState(false)
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.userSlice);
  const [uploadProfilePicture] = useUploadProfilePictureMutation();

  const handleImageChange = (e) => {
    e.preventDefault;
    const selectedFile = e.target.files[0];
    if(selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImageData({...imageData, selectedFile,previewURL})
    }
  }
  
  const handleSubmit = async () => {
    if (!imageData.selectedFile) {
        toast.error("Please select an image first!");
        return;
    }

    try {
        // Upload image to Imgbb
        const response = await dispatch(uploadImageToImgbb(imageData.selectedFile));

        if (uploadImageToImgbb.fulfilled.match(response)) {
            const uploadedURL = response.payload;

            // Upload URL to backend
            const responseFromBackend = await uploadProfilePicture({ _id: userData?._id, data: uploadedURL });

            if (responseFromBackend.data?.success) {
                toast.success(responseFromBackend.data.message);
            } else {
                toast.error(responseFromBackend.data.message || "Error uploading profile picture");
            }
        } else {
            toast.error("Image upload failed!");
        }
    } catch (error) {
        toast.error("An unexpected error occurred.");
        console.error(error);
    }
};



  return (
    <div className="w-screen ">
      <div className="md:max-w-[92vw] md:mx-auto mx-8 md:mt-12 my-6">
        <img className="h-10 md:h-12" src={logo} alt="projease logo" />
        <div className="flex flex-col md:h-[80vh] h-[86vh]">
          <div className="md:m-10 mt-4 flex-grow">
            {/* Updated Header and Description */}
            <h1 className="md:text-5xl text-4xl font-[600]">
              Upload your profile picture.
            </h1>
            <p className="mt-2 text-gray-500">
              Make your profile stand out. Let’s add a face to your name.
            </p>
            {/* Separator */}
            <hr className="mt-2 md:mb-8 mb-3 border-gray-300" />
            <div className="flex md:items-start items-center justify-center md:justify-start">
            <div className="h-[300px] w-[300px] rounded-3xl bg-gray-100 border border-gray-300 flex items-center justify-center">
              <div className="bg-gray-200 hover:bg-gray-300 duration-500 cursor-pointer border-[4px] border-gray-400 border-dashed relative w-3/4 h-3/4 rounded-full overflow-hidden">
              {
                imageData?.previewURL ? 
                <div  className="w-full h-full relative">
                  <img  className="w-full h-full object-cover object-center" src={imageData?.previewURL} alt="" />
                  <div className={`bg-[#0000006b] duration-300 ${hover? "opacity-100" : "opacity-0"} w-full h-full flex items-center justify-center absolute top-0 left-0`}>
                    <h1 className={`text-2xl duration-700 uppercase ${hover ? 'translate-y-0' : 'translate-y-[300px]'} text-white`}>Change</h1>
                  </div>
                </div> :


                <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                <LuImagePlus className="text-3xl" />
                  <p className="text-sm text-gray-500"> Select or Drag an Image</p>
                </div>
              }
                <input 
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                  className="bg-green-500 cursor-pointer rounded-full absolute top-0 left-0 opacity-0 w-full h-full opacity"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            </div>
            <button onClick={handleSubmit} className="bg-[#1a1a1a] px-6 py-2 text-white rounded-lg border-[#1a1a1a] border hover:bg-white hover:text-black duration-500 cursor-pointer mt-8">
                Next
              </button>
          </div>
          {/* Step Indicator */}
          <p className="text-sm w-full text-center mt-auto text-gray-400">
            3 of 4
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upload_your_profile_picture;
