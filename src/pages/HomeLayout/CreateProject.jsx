import { useEffect, useState } from "react";
import { TiWarning } from "react-icons/ti";
import { useCreateProjectMutation } from "../../redux/api/projectsApi";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";

const CreateProject = () => {
  const [info, setInfo] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyWebsite: "",
  });
  const [error, setError] = useState({ password: "", confirmPassword: "" });
  useEffect(() => {
    if (info.password.length > 0) {
      if (info.password.length < 8) {
        setError((prevState) => ({
          ...prevState,
          password: "Password must be at least 8 characters.",
        }));
      } else {
        setError((prevState) => ({ ...prevState, password: "" }));
      }
    }
    if (info.confirmPassword.length > 0) {
      if (info.password !== info.confirmPassword) {
        setError((prevState) => ({
          ...prevState,
          confirmPassword: "Password didn't matched.",
        }));
      } else {
        setError((prevState) => ({ ...prevState, confirmPassword: "" }));
      }
    }
  }, [info.password, info.confirmPassword]);
  const [
    createProject,
    { data: createProjectData, error: createProjectError },
  ] = useCreateProjectMutation();
  const userInfo = useSelector((state) => state.userSlice);

  const { data } = useGetUserQuery(userInfo?.email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //mock data replace this with current user data
    const projectObj = {
      projectName: info.name,
      projectPassword: info.password,
      companyName: info.companyName,
      companyWebsite: info.companyWebsite,
      projectCreatorId: data?._id,
      members: [
        {
          userId: data?._id,
          role: "admin",
        },
      ],
    };
    try {
      await createProject(projectObj).unwrap();
      if (createProjectData) {
        toast.success(createProjectData.message);
      } else {
        toast.error(createProjectError.message);
      }
    } catch (err) {
      toast.error("there was an error creating the project :" + err);
    }
    // project uid (step)
    // project name
    // project password
    // member capacity (choice)
    // personal/company use (choice)
    // company name
    // company website
    // task id (passive)
    // chat id (passive)
    // project creator: "" (passive)
    // members:[{_id:01, position:admin},] (passive)

    console.log(info);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="border border-[#1d1d1d] shadow-lg shadow-[#c4c3c3] p-8 rounded-[10px] w-[350px]"
        onSubmit={handleSubmit}
      >
        <h3 className="text-3xl font-semibold mb-3">Join Project</h3>
        <div className="flex flex-col mb-4">
          <label className="text-sm text-gray-500" htmlFor="projectName">
            Project Name
          </label>
          <input
            required
            className="border border-gray-400 mt-1 rounded-[5px] px-2 py-1.5 w-full"
            onChange={(e) => {
              setInfo({ ...info, name: e.target.value });
            }}
            type="text"
            name="projectName"
            placeholder="Enter your project name"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm text-gray-500" htmlFor="companyName">
            Company Name
          </label>
          <input
            required
            className="border border-gray-400 mt-1 rounded-[5px] px-2 py-1.5 w-full"
            onChange={(e) => {
              setInfo({ ...info, companyName: e.target.value });
            }}
            type="text"
            name="companyName"
            placeholder="Enter your company name"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm text-gray-500" htmlFor="companyWebsite">
            Company website url
          </label>
          <input
            required
            className="border border-gray-400 mt-1 rounded-[5px] px-2 py-1.5 w-full"
            onChange={(e) => {
              setInfo({ ...info, companyWebsite: e.target.value });
            }}
            type="text"
            name="companyWebsite"
            placeholder="Enter your company website url"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500" htmlFor="password">
            Password
          </label>
          <input
            required
            className="border border-gray-400 mt-1 rounded-[5px] px-2 py-1.5"
            onChange={(e) => {
              setInfo({ ...info, password: e.target.value });
            }}
            type="password"
            name="password"
            placeholder="Enter your project password"
          />

          <span
            className={`text-xs text-red-500 text-end flex items-center gap-0.5 mb-1 justify-end ${
              error.password ? "opacity-100" : "opacity-0"
            }`}
          >
            <TiWarning />
            {error.password}
          </span>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            required
            className="border border-gray-400 mt-1 rounded-[5px] px-2 py-1.5"
            onChange={(e) => {
              setInfo({ ...info, confirmPassword: e.target.value });
            }}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
          />
          <span
            className={`text-xs text-red-500 opacity text-end flex items-center gap-0.5 justify-end mb-1 ${
              error.confirmPassword ? "opacity-100" : "opacity-0"
            }`}
          >
            <TiWarning />
            {error.confirmPassword}
          </span>
        </div>

        <button
          className={`mt-4 text-center rounded-[5px] px-2 py-1.5 ${
            !info.password ||
            !info.confirmPassword ||
            error.password ||
            error.confirmPassword
              ? "bg-[#414141] cursor-not-allowed"
              : "bg-[#222222]"
          }  hover:bg-[#2e2e2e] duration-300  w-full text-white`}
          type="submit"
          disabled={
            !info.password ||
            !info.confirmPassword ||
            error.password ||
            error.confirmPassword
          }
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
