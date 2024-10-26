import logo from "/logo/Full-logo/logo-white-ov2.png";
import { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
const Upload_your_profile_picture = () => {
  const [imageData, setImageData] = useState({
    selectedFile: null,
    previewURL: "",
    uploadedURL: ""
  });

  const [hover, setHover] = useState(false)

  const handleImageChange = (e) => {
    e.preventDefault;
    const selectedFile = e.target.files[0];
    if(selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImageData({...imageData, selectedFile,previewURL})
    }
  }

  console.log(imageData)

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
            <hr className="my-2 border-gray-300" />
            <div className="h-[350px] w-[350px] rounded-3xl bg-gray-100 border border-gray-300 flex items-center justify-center">
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
