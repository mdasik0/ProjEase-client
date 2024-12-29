import { useState, useRef, useEffect } from "react";
import logo from "/logo/Full-logo/logo-white-ov2.png";
import { CiCalendarDate } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import userApi, { useUpdateUserMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { refetchUpdate, setLoading } from "../../redux/features/userSlice";
import { jobFields} from '../../components/Shared/resources'
const Additional_info = () => {
  const [formData, setFormData] = useState({
    birthday: "",
    jobTitle: "",
    address: { street: "", city: "", state: "", country: "" },
    bio: "",
  });

  const { userData, isLoading, email } = useSelector(
    (state) => state.userSlice
  );
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  const dateInputRef = useRef(null);

  const openCalendar = () => {
    dateInputRef.current.showPicker();
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true)); // Start loading
  
    try {
      const response = await updateUser({
        _id: userData?._id,
        data: formData,
      }).unwrap();
      console.log(response.success);
      if (response?.success) {
        toast.success("Additional information updated");
        console.log('info update complete');
        // Refetch user once
        const refetchedUser = await dispatch(
          userApi.endpoints.getUser.initiate(email)
        );

        console.log(refetchedUser);
        dispatch(refetchUpdate(refetchedUser.data));
  
        const isInvited = JSON.parse(sessionStorage.getItem("joinProject_with_invitation"))
      if(isInvited) {
        return navigate(`/join-project/token=${isInvited}`)
      } else {
        return navigate("/project");
      }
      } else {
        toast.error(response?.message || "Failed to update information.");
      }
    } catch (error) {
      toast.error("An error occurred while updating.");
      console.error(error);
    } finally {
      dispatch(setLoading(false)); // End loading
    }
  };
  
  const skipAdditionalInfo = async () => {
    dispatch(setLoading(true)); // Start loading
    try {      
      const isInvited = JSON.parse(sessionStorage.getItem("JoinProject_with_invitation"))
      if(isInvited) {
        localStorage.removeItem("reloaded");

        return navigate(`/join-project/token=${isInvited}`)

      } else {
        localStorage.removeItem("reloaded");

        return navigate("/projects");
      }

    } catch (error) {
      toast.error("Failed to skip additional info.");
      console.error(error);
    } finally {
      dispatch(setLoading(false)); // End loading
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("reloaded")) {
      localStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);
  
  

  return (
    <div className="w-screen ">
      <div className="md:max-w-[92vw] md:mx-auto mx-8 md:mt-12 my-6">
        <img className="h-10 md:h-12" src={logo} alt="projease logo" />
        <div className="flex flex-col md:h-[80vh] h-[86vh]">
          <div className="md:m-10 mt-4 flex-grow">
            <h1 className="md:text-5xl text-4xl font-[600]">
              Additional information
            </h1>
            <p className="mt-2 text-gray-500">
              Congratulations! your account setup is complete. Add this
              information for better personalizations.
            </p>
            <hr className="mt-2 mb-10 border-gray-300" />
            <form onSubmit={handleSubmit}>
              <div className="flex gap-6">
                <div className="mb-4 relative w-[300px]">
                  <label className="text-sm block mb-1" htmlFor="birthday">
                    Birthday
                  </label>
                  <input
                    ref={dateInputRef}
                    onChange={(e) => {
                      setFormData({ ...formData, birthday: e.target.value });
                    }}
                    className="border-[2px] border-gray-300 block w-full px-3 py-2 rounded-lg"
                    type="date"
                    name="birthday"
                    id="birthday"
                  />
                  <div
                    onClick={openCalendar}
                    className="bg-gray-200 w-fit p-1.5 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer tooltip hover:tooltip-open"
                    data-tip="date picker"
                  >
                    <CiCalendarDate />
                  </div>
                </div>
                <div className="mb-4 relative w-[300px]">
                  <label className="text-sm block mb-1" htmlFor="jobTitle">
                    Job title
                  </label>
                  <select
                    value={formData.jobTitle} // Bind the value to formData.jobTitle
                    onChange={(e) => {
                      setFormData({ ...formData, jobTitle: e.target.value });
                    }}
                    className="border-[2px] border-gray-300 block w-full px-3 py-2 rounded-lg"
                    name="jobTitle"
                    id="jobTitle"
                  >
                    <option value="" disabled>
                      Select your job title
                    </option>
                    {jobFields.map((job) => (
                      <option key={job.id} value={job.name}>
                        {job.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4 relative w-fit">
                <label className="text-sm block mb-1">Address</label>
                <div className="border-[2px] border-gray-300 w-full rounded-lg grid grid-cols-2 gap-4 md:p-6 p-3">
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          street: e.target.value,
                        },
                      })
                    }
                    placeholder="Street"
                    type="text"
                    className="border-[2px] sm:w-[277px] border-gray-300 block px-3 py-[6px] rounded-lg "
                  />
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value },
                      })
                    }
                    placeholder="City"
                    type="text"
                    className="border-[2px] sm:w-[277px] border-gray-300 block px-3 py-[6px] rounded-lg "
                  />
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, state: e.target.value },
                      })
                    }
                    placeholder="State"
                    type="text"
                    className="border-[2px] sm:w-[277px] border-gray-300 block px-3 py-[6px] rounded-lg "
                  />
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          country: e.target.value,
                        },
                      })
                    }
                    placeholder="Country"
                    type="text"
                    className="border-[2px] sm:w-[277px] border-gray-300 block px-3 py-[6px] rounded-lg "
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col md:items-end items-start gap-6">
                <div className=" relative w-fit">
                  <label className="text-sm block mb-1">Bio</label>
                  <textarea
                    onChange={(e) => {
                      setFormData({ ...formData, bio: e.target.value });
                    }}
                    className="border-[2px] border-gray-300 rounded-lg grid  gap-4 p-3 text-sm md:w-[300px] w-[435px] h-[100px]"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-[#1a1a1a] px-6 py-2 text-white rounded-lg border-[#1a1a1a] border hover:bg-white hover:text-black duration-500 cursor-pointer"
                    type="submit"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <span>Done</span>
                    )}
                  </button>
                  <button
                    onClick={skipAdditionalInfo}
                    className="bg-gray-400 px-6 py-2 text-white rounded-lg border border-gray-400 hover:bg-gray-500 hover:border-gray-500 duration-500 cursor-pointer"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Additional_info;
