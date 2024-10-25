import { MdFileUpload } from "react-icons/md";
import logo from "/logo/Full-logo/logo-white-ov2.png";
const Upload_your_profile_picture = () => {
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
            <div className="h-[350px] w-[350px] rounded-3xl bg-gray-200 border-gray-300">
                <input type="file" />
                
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
