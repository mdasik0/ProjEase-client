import { useState } from "react";
import TitleandSub from "../../components/ProjectLayout/TitleandSub";
import { useSelector } from "react-redux";
import { useCreateProjectMutation } from "../../redux/api/projectsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdditionalProjectInfo = () => {
  const [formData, setFormData] = useState({
    projectDescription: "",
    CompanyOrTeamName: "",
    coWebUrl: "",
  });

  // jokhon user project create korbe se by default sei project e join hoia jabe and active hoia jabe
  // and onno kono project active thakle oita inactive and new project e se active hoia jabe
  // userData theke amra active thaka project er id niye nibo
  // ebong sei id te amra additional project info er data update korbo

  const { userData } = useSelector((state) => state.userSlice);
  const [createProject] = useCreateProjectMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // project id 
    // formData 
    // updateProject rtq query obj 

    try {
      const response = await createProject(formData);

      if (response.data?.success) {
        toast.success(response.data.message);
        navigate("/additional-project-info");
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
              <label
                className="text-sm block mb-1"
                htmlFor="Company-team-name"
              >
                Company/Team Name
              </label>
              <input
                className="border-[2px] border-black block w-full px-3 py-2 rounded-lg"
                placeholder="Enter Company/Team name here"
                required
                onChange={(e) =>
                  setFormData({ ...formData, CompanyOrTeamName: e.target.value })
                }
                type="text"
                name="Company-team-name"
                id="Company-team-name"
              />
            </div>
            <div className="mb-4">
              <label
                className="text-sm block mb-1"
                htmlFor="comp-web-url"
              >
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
                  setFormData({ ...formData, projectDescription: e.target.value })
                }
                name="project-description"
                id="project-description"
              />
            </div>

            <button
              className="text-white bg-[#1a1a1a] duration-500 hover:text-black hover:bg-gray-300 px-5 py-2 rounded mt-4"
              type="submit"
              aria-label="Submit project details"
            >
              Submit
            </button>
          </form>
        </section>
      </TitleandSub>
    </main>
  );
};

export default AdditionalProjectInfo;