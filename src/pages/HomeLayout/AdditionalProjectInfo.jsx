import { useEffect, useState } from "react";
import TitleandSub from "../../components/ProjectLayout/TitleandSub";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../redux/api/projectsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../redux/api/userApi";
import { setUserData } from "../../redux/features/userSlice";
import { storeActiveProject } from "../../redux/features/projectSlice";

const AdditionalProjectInfo = () => {
  const [formData, setFormData] = useState({
    projectDescription: "",
    CompanyOrTeamName: "",
    coWebUrl: "",
  });
  const dispatch = useDispatch();
  const { userData, email } = useSelector((state) => state.userSlice);
  const { projectData } = useSelector((state) => state.projectSlice);
  const [updateProject] = useUpdateProjectMutation();
  const navigate = useNavigate();
  const currentProj = userData?.joinedProjects?.find(
    (p) => p.status === "active"
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentProj) {
      toast.error("Please refresh the page and try again.");
      return; // Stop execution if no active project
    }

    try {
      const response = await updateProject({
        _id: currentProj.projectId,
        newObj: formData,
      });

      if (response.data?.success) {
        toast.success(response.data.message);
        navigate("/projects");
      } else if (response.error?.data?.message) {
        toast.error(response.error.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred while creating the project.");
    }
  };

  const handleSkip = () => {
    navigate("/projects");
  };

  const location = window.location.pathname;

  const { data, refetch } = useGetUserQuery(email, {
    refetchOnMount: true,
    refetchOnFocus: true,
  });
  const { data: projectNewData, refetch: projectRefetch } = useGetProjectQuery(
    projectData._id
  );
  useEffect(() => {
    refetch();
    projectRefetch();
  }, [location]);

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (projectNewData) {
      dispatch(storeActiveProject(projectNewData));
    }
  }, [projectNewData, dispatch]);

  return (
    <main className="w-screen h-screen lg:px-20 md:pt-16 p-6 relative">
      <TitleandSub
        title="Additional Project Information"
        subTitle="Optional but recommended! Add extra details to give your project a strong foundation and improve team collaboration."
      >
        <section aria-labelledby="project-details-section">
          <h2 id="project-details-section" className="sr-only">
            Project Details Form
          </h2>
          <form
            onSubmit={handleSubmit}
            className="sm:w-[480px] text-black"
            role="form"
          >
            <div className="mb-4">
              <label className="text-sm block mb-1" htmlFor="Company-team-name">
                Company/Team Name
              </label>
              <input
                className="border-[2px] border-black block w-full px-3 py-2 rounded-lg"
                placeholder="Enter Company/Team name here"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CompanyOrTeamName: e.target.value,
                  })
                }
                type="text"
                name="Company-team-name"
                id="Company-team-name"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm block mb-1" htmlFor="comp-web-url">
                Company website url
              </label>
              <input
                className="border-[2px] border-black block w-full px-3 py-2 rounded-lg"
                placeholder="Enter Company website url here"
                required
                onChange={(e) =>
                  setFormData({ ...formData, coWebUrl: e.target.value })
                }
                type="text"
                name="comp-web-url"
                id="comp-web-url"
              />
            </div>
            <div className="mb-4">
              <label
                className="text-sm block mb-1"
                htmlFor="project-description"
              >
                Project description
              </label>
              <textarea
                className="border-[2px] border-black block w-full h-[150px] px-3 py-2 rounded-lg"
                placeholder="Enter Company website url here"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectDescription: e.target.value,
                  })
                }
                name="project-description"
                id="project-description"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                className="text-white bg-[#1a1a1a] duration-500 hover:text-black hover:bg-gray-300 px-5 py-2 rounded mt-4"
                type="submit"
                aria-label="Submit project details"
              >
                Submit
              </button>
              <button
                onClick={handleSkip}
                className="text-[#1a1a1a] bg-white duration-500 hover:bg-[#1a1a1a] hover:text-white px-5 py-2 rounded mt-4 border border-[#1a1a1a]"
                type="submit"
                aria-label="Submit project details"
              >
                Skip
              </button>
            </div>
          </form>
        </section>
      </TitleandSub>
    </main>
  );
};

export default AdditionalProjectInfo;
