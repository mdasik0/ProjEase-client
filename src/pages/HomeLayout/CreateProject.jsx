import { useEffect, useState } from "react";
import TitleandSub from "../../components/ProjectLayout/TitleandSub";
import { GrCircleInformation } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useCreateProjectMutation } from "../../redux/api/projectsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useUpdateJoinedProjectsMutation } from "../../redux/api/userApi";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectPassword: "",
    projectType: "",
    startDate: new Date().toISOString().split("T")[0], // Default to today's date
    endDate: "",
    isPrivate: false,
  });
  const projectTypes = [
    { value: "software", label: "Software Development" },
    { value: "marketing", label: "Marketing Campaign" },
    { value: "design", label: "Design & Creative" },
    { value: "construction", label: "Construction" },
    { value: "education", label: "Education/Training" },
    { value: "finance", label: "Finance & Accounting" },
    { value: "human_resources", label: "Human Resources" },
    { value: "research", label: "Research & Development" },
    { value: "event", label: "Event Planning" },
    { value: "healthcare", label: "Healthcare" },
    { value: "non_profit", label: "Non-Profit" },
    { value: "personal", label: "Personal" },
    { value: "other", label: "Other" },
  ];

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

    // If no date is selected, default to today
    if (!selectedDate) {
      setFormData({ ...formData, startDate: today });
    } else if (selectedDate >= today) {
      // Only accept dates that are today or later
      setFormData({ ...formData, startDate: selectedDate });
    } else {
      // Reset to today if past date is selected
      toast.error("The start date cannot be in the past!");
      setFormData({ ...formData, startDate: today });
    }
  };

  useEffect(() => {
    const titleSpans = document.querySelectorAll(".project-ps-title");
    const timer = setTimeout(() => {
      titleSpans.forEach((span) => {
        span.classList.add("disappear");
      });
    }, 3200);
    const timertwo = setTimeout(() => {
      const fakebg = document.querySelector(".anim-backdrop-project-sp");
      fakebg.classList.add("bg-disappear");
    }, 4000);
    const timerthree = setTimeout(() => {
      const fakebg = document.querySelector(".anim-backdrop-project-sp");
      fakebg.classList.add("hidden");
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timertwo);
      clearTimeout(timerthree);
    }; // Clean up the timer on component unmount
  }, []);

  const { userData } = useSelector((state) => state.userSlice);
  const [createProject] = useCreateProjectMutation();
  const [updateJoinedProjects] = useUpdateJoinedProjectsMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.projectName || !formData.projectPassword) {
      return toast.error("Please fill in all required fields.");
    }
    const project = {
      ...formData,
      taskId: "",
      ChatId: "",
      members: [
        {
          userId: userData?._id,
          role: "admin",
        },
      ],
      CreatedBy: userData?._id,
    };

    try {
      const response = await createProject(project);

      if (response.data?.success) {
        toast.success(response.data.message);
        //joined projects field added to the user
        const joinedProjects = {
          projectId: response.data.projectId,
          status: "active",
        };
        const updateResponse = await updateJoinedProjects({
          _id: userData?._id,
          data: joinedProjects,
        });
        if (updateResponse?.data?.success) {
          toast.success(updateResponse?.data?.message);
          return navigate("/additional-project-info");
        }
      } else if (response.error?.data?.message) {
        // Handle backend error message
        return toast.error(response.error.data.message);
      } else {
        // Fallback for unexpected errors
        return toast.error("An unexpected error occurred.");
      }
    } catch (e) {
      console.error("Project creation error:", e);
      toast.error("An error occurred while creating the project.");
    }
    
  };

  //first make sure the page is responsive done
  //then make sure that a user can only create only 2/3 projects done
  //then find the next stop

  return (
    <div className="w-screen h-screen lg:px-20 md:pt-16 p-6 relative">
      <div className="anim-backdrop-project-sp absolute w-screen h-screen top-0 left-0 bg-white z-50 flex items-center justify-center">
        <h1 className={`text-5xl font-[500] poppins project-ps-title`}>
          <span className="text-1">Welcome</span>{" "}
          <span className="text-2">to</span>{" "}
          <span className="text-3">Your</span>{" "}
          <span className="text-4">Project</span>{" "}
          <span className="text-5">Space!</span>
        </h1>
      </div>
      <TitleandSub
        title="Create new project"
        subTitle="Let's get your ideas organized and your team ready to
          collaborate. Fill in the details below to start building your project."
      >
        <form onSubmit={handleSubmit} className="sm:w-[480px] text-black">
          <div className="mb-4">
            <label className="text-sm  block mb-1" htmlFor="project-name">
              Project name
            </label>
            <input
              className="border-[2px] border-black block w-full px-3 py-2 rounded-lg"
              placeholder="Enter project name here"
              required
              onChange={(e) =>
                setFormData({ ...formData, projectName: e.target.value })
              }
              type="text"
              name="project-name"
              id="project-name"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm  block mb-1" htmlFor="project-name">
              Project Type
            </label>
            <select
              id="project-type"
              value={formData?.projectType}
              onChange={(e) =>
                setFormData({ ...formData, projectType: e.target.value })
              }
              className="border-[2px] border-gray-500 w-full px-3 py-2 rounded-lg"
            >
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-sm  block mb-1" htmlFor="project-password">
              Project password
            </label>
            <input
              className="border-[2px] border-black block w-full px-3 py-2 rounded-lg"
              placeholder="Enter project password here"
              required
              onChange={(e) =>
                setFormData({ ...formData, projectPassword: e.target.value })
              }
              type="password"
              name="project-password"
              id="project-password"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="mb-4 w-full">
              <label className="text-sm block mb-1" htmlFor="starting-date">
                Starting date{" "}
                <span className="text-xs text-[#1a1a1a]">(optional)</span>
              </label>
              <input
                className="border-[2px] border-black block w-full px-3 py-2 rounded-lg"
                value={formData.startDate}
                onChange={handleDateChange}
                type="date"
                name="starting-date"
                id="starting-date"
                min={new Date().toISOString().split("T")[0]} // Restrict past dates
              />
            </div>
            <div className="mb-4 w-full">
              <label className="text-sm  block mb-1" htmlFor="ending-date">
                Ending date{" "}
                <span className="text-xs text-[#1a1a1a]">(optional)</span>
              </label>
              <input
                className="border-[2px] border-black block w-full px-3 py-2 rounded-lg"
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                type="date"
                name="ending-date"
                id="ending-date"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 w-fit">
            <input
              className="cursor-pointer"
              onChange={(e) =>
                setFormData({ ...formData, isPrivate: e.target.checked })
              }
              type="checkbox"
              name="private-project"
              id="private-project"
            />
            <label className="text-sm cursor-pointer" htmlFor="private-project">
              Private project
            </label>
            <div className="pri_proj_icon p-1 relative hover:bg-gray-300 duration-500 cursor-help text-gray-600 hover:text-gray-800 rounded-full">
              <GrCircleInformation className="text-xl" />
              <div className="help_T_pri_proj absolute left-8 w-[320px] top-0 bg-gray-100 p-3 border border-gray-400 rounded-lg text-sm shadow-md shadow-gray-500 opacity-0 transition-opacity duration-300 pointer-events-none">
                <span className="flex gap-1 items-start  font-[500]">
                  <MdOutlineCheckBoxOutlineBlank className="text-lg" />
                  <span>
                    Members join with inviation link{" "}
                    <span className="text-green-600">without password.</span>
                  </span>
                </span>
                <br />
                <span className="flex gap-1 items-start  font-[500]">
                  <MdOutlineCheckBox className="text-lg" />
                  <span>
                    Members join with inviation link{" "}
                    <span className="text-red-600">with password.</span>
                  </span>
                </span>
              </div>
            </div>
          </div>

          <button
            className="text-white bg-[#1a1a1a] duration-500 hover:text-black hover:bg-gray-300 px-5 py-2 rounded mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      </TitleandSub>
    </div>
  );
};

export default CreateProject;
