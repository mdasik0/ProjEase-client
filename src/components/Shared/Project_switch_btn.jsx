import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { GoArrowSwitch } from "react-icons/go";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import { useMoreJoinedProjectsInfoMutation } from "../../redux/api/projectsApi";
import { useSwitchProjectStatusMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";

const Project_switch_btn = () => {
  const [openProjectDropDown, setOpenProjectDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const { userData } = useSelector((state) => state.userSlice);
  const [moreJoinedProjectsInfo, { data }] =
    useMoreJoinedProjectsInfoMutation();
  const [switchProjectStatus] = useSwitchProjectStatusMutation();

  const joinedProjects = useMemo(
    () => userData?.joinedProjects || [],
    [userData]
  );
  const userId = useMemo(() => userData?._id, [userData]);

  const toggleDropDown = useCallback(() => {
    setOpenProjectDropDown((prev) => !prev);
  }, []);

  const selectProject = useCallback(
    async (projectId) => {
      console.log(projectId, userId)
      if (projectId && userId) {
        const response = await switchProjectStatus({ projectId, userId });
        if (response?.data?.success) {
          return window.location.reload();
        } else if (response?.error) {
          console.log(response.error)
          toast.error("Failed to switch project.");
        }
      } else {
        return toast.error("Please provide projectId and userId");
      }
      setOpenProjectDropDown(false);
    },
    [userId, switchProjectStatus]
  );

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProjectDropDown(false);
      }
    };

    if (openProjectDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProjectDropDown]);

  useEffect(() => {
    if (joinedProjects.length) {
      moreJoinedProjectsInfo(joinedProjects);
    }
  }, [joinedProjects, moreJoinedProjectsInfo]);

  const activeProjectName = useMemo(() => {
    return data?.find((p) => p.status === "active")?.name || "Select project";
  }, [data]);

  return (
    <div className="p-4 relative" ref={dropdownRef}>
      {/* Dropdown list */}
      <div
        className={`absolute duration-300 w-[250px] p-3 bg-gray-300 border border-gray-300 rounded-xl flex flex-col gap-3 ${
          openProjectDropDown
            ? "-right-[102%] bottom-3"
            : "-right-[70%] bottom-3 opacity-0 pointer-events-none"
        }`}
      >
        {data?.map((project) => (
          <div
            key={project.projectId}
            onClick={() => selectProject(project.projectId)}
            className="bg-gray-100 p-3 rounded-lg font-[500] border border-gray-300 hover:border-gray-500 flex items-center justify-between cursor-pointer duration-300"
          >
            <h4>{project.name}</h4>
            {project.status === "active" ? (
              <IoMdCheckmark className="text-green-500" />
            ) : (
              <GoArrowSwitch />
            )}
          </div>
        ))}
      </div>

      {/* Label */}
      <div className="flex items-center justify-between mb-1 mx-2">
        <p className="text-xs">Switch project</p>
        <GoArrowSwitch className="text-sm" />
      </div>

      {/* Current Project */}
      <div
        onClick={toggleDropDown}
        className="bg-gray-100 p-3 rounded-lg font-[500] border border-gray-300 hover:border-gray-400 flex items-center justify-between cursor-pointer duration-300"
      >
        <h4>{activeProjectName}</h4>
        <IoIosArrowDown />
      </div>
    </div>
  );
};

export default Project_switch_btn;
