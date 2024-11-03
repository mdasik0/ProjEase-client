import { useState, useRef } from "react";
import logo from "/logo/Full-logo/logo-white-ov2.png";
import { CiCalendarDate } from "react-icons/ci";

const Additional_info = () => {
  const [formData, setFormData] = useState({
    birthday: "",
    jobTitle: "",
    address: { street: "", city: "", state: "", country: "" },
    bio: "",
  });

  const jobFields = [
    { id: 1, name: "Software Engineer" },
    { id: 2, name: "Data Scientist" },
    { id: 3, name: "Product Manager" },
    { id: 4, name: "Web Developer" },
    { id: 5, name: "Graphic Designer" },
    { id: 6, name: "Marketing Specialist" },
    { id: 7, name: "Sales Associate" },
    { id: 8, name: "Human Resources Manager" },
    { id: 9, name: "Project Coordinator" },
    { id: 10, name: "System Analyst" },
    { id: 11, name: "Database Administrator" },
    { id: 12, name: "UX/UI Designer" },
    { id: 13, name: "Network Engineer" },
    { id: 14, name: "Quality Assurance Tester" },
    { id: 15, name: "Business Analyst" },
  ];

  const dateInputRef = useRef(null);

  const openCalendar = () => {
    dateInputRef.current.showPicker();
  };

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
            <form>
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
                    onChange={(e) => {
                      setFormData({ ...formData, jobTitle: e.target.value });
                    }}
                    className="border-[2px] border-gray-300 block w-full px-3 py-2 rounded-lg "
                    name="jobTitle"
                    id="jobTitle"
                  >
                    <option value="" disabled selected>
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
                    placeholder="Street"
                    type="text"
                    className="border-[2px] md:w-[277px] border-gray-300 block px-3 py-[6px] rounded-lg "
                  />
                  <input
                    placeholder="City"
                    type="text"
                    className="border-[2px] md:w-[277px] border-gray-300 block px-3 py-[6px] rounded-lg "
                  />
                  <input
                    placeholder="State"
                    type="text"
                    className="border-[2px] md:w-[277px] border-gray-300 block px-3 py-[6px] rounded-lg "
                  />
                  <input
                    placeholder="Country"
                    type="text"
                    className="border-[2px] md:w-[277px] border-gray-300 block px-3 py-[6px] rounded-lg "
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col md:items-end items-start gap-6">
                <div className=" relative w-fit">
                  <label className="text-sm block mb-1">Bio</label>
                  <textarea className="border-[2px] border-gray-300 rounded-lg grid  gap-4 p-3 text-sm md:w-[300px] w-[435px] h-[100px]" />
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-[#1a1a1a] px-6 py-2 text-white rounded-lg border-[#1a1a1a] border hover:bg-white hover:text-black duration-500 cursor-pointer"
                    type="submit"
                  >
                    Done
                  </button>
                  <button className="bg-gray-400 px-6 py-2 text-white rounded-lg border border-gray-400 hover:bg-gray-500 hover:border-gray-500 duration-500 cursor-pointer">
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
