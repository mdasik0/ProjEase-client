import { useSelector } from "react-redux";
import { useUpdateNameMutation } from "../../redux/api/userApi";
import logo from "/logo/Full-logo/logo-white-ov2.png";
import { LuUserSquare } from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Enter_your_name = () => {
  const [updateName] = useUpdateNameMutation();
  const { userData } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const data = {
      firstname,
      lastname,
    };
    try {
      const response = await updateName({ _id: userData?._id, data });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        //redirect to the imgfield
        navigate("/auth/upload-profile-picture");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      console.error("There was a problem updating the name", err.message);
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
              Let’s Get to Know You!
            </h1>
            <p className="mt-2 text-gray-500">
              Please provide your name to continue setting up your ProjEase
              account.
            </p>
            {/* Separator */}
            <hr className="mt-2 border-gray-300" />
            <form onSubmit={handleSubmit} className="mt-6">
              {/* First Name Field */}
              <div className="mb-6 relative md:w-[500px]">
                <label className="text-sm block mb-1" htmlFor="firstname">
                  First name
                </label>
                <input
                  className="border-[2px] border-gray-300 block w-full px-3 py-2 rounded-lg"
                  placeholder="John"
                  required
                  type="text"
                  name="firstname"
                  id="firstname"
                />
                <div
                  className="bg-gray-200 w-fit p-1.5 rounded absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer tooltip hover:tooltip-open"
                  data-tip="First name"
                >
                  <LuUserSquare />
                </div>
              </div>

              {/* Last Name Field */}
              <div className="mb-6 relative md:w-[500px]">
                <label className="text-sm block mb-1" htmlFor="lastname">
                  Last name
                </label>
                <input
                  className="border-[2px] border-gray-300 block w-full px-3 py-2 rounded-lg"
                  placeholder="Doe"
                  required
                  type="text"
                  name="lastname"
                  id="lastname"
                />
                <div
                  className="bg-gray-200 w-fit p-1.5 rounded absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer tooltip hover:tooltip-open"
                  data-tip="Last name"
                >
                  <LuUserSquare />
                </div>
              </div>

              {/* Updated Button Style */}
              <button className="bg-[#1a1a1a] px-6 py-2 text-white rounded-lg border-[#1a1a1a] border hover:bg-white hover:text-black duration-500 cursor-pointer mt-">
                Next
              </button>
            </form>
          </div>
          {/* Step Indicator */}
          <p className="text-sm w-full text-center mt-auto text-gray-400">
            2 of 4
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enter_your_name;
