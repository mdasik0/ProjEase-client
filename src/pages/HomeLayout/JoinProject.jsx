import { MdError } from "react-icons/md";
import TitleandSub from "../../components/ProjectLayout/TitleandSub";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-web";
import toast from "react-hot-toast";
import { useJoinProjectMutation } from "../../redux/api/projectsApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetProjSlice } from "../../redux/features/projectSlice";
import { resetTaskSlice } from "../../redux/features/tasksSlice";
import { ImPaste } from "react-icons/im";

const JoinProject = () => {
  const [formData, setFormData] = useState({ projId: "", password: "" });
  const [valErr, setValErr] = useState({ projIdErr: "", passErr: "" });
  const { userData } = useSelector((state) => state.userSlice);

  const [joinProject, { isLoading }] = useJoinProjectMutation();

  const iconMenuRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleJoinProject = async (e) => {
    e.preventDefault();
    if (!formData.projId) {
      return setValErr({
        ...valErr,
        projIdErr: "Please enter your project id",
      });
    }
    if (!formData.password) {
      return setValErr({
        ...valErr,
        projIdErr: "Please enter your project password",
      });
    }

    try {
      const userId = userData?._id;
      if (userId) {
        const info = {
          projId: formData.projId.trim(),
          password: formData.password.trim(),
          userId,
        };
        const response = await joinProject(info);
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(resetTaskSlice());
          dispatch(resetProjSlice());
          return navigate("/projects");
        } else {
          toast.error(response.error.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!userData._id) {
      navigate("/auth/sign-in");
    }
  },[])

  useEffect(() => {
    if (iconMenuRef.current) {
      const animationMenu = Lottie.loadAnimation({
        container: iconMenuRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "/Visibility V3/visibility-V3.json",
      });

      let directionMenu = -1;

      const toggleAnimation = () => {
        animationMenu.setDirection(directionMenu);
        animationMenu.play();

        directionMenu = -directionMenu;
        setFormData((prevData) => ({ ...prevData, show: directionMenu === 1 }));
      };

      iconMenuRef.current.addEventListener("click", toggleAnimation);

      return () => {
        if (iconMenuRef.current) {
          iconMenuRef.current.removeEventListener("click", toggleAnimation);
        }
        animationMenu.destroy();
      };
    }
  }, [setFormData]);

  return (
    <div className="w-screen h-screen p-20">
      <TitleandSub
        title={"join project"}
        subTitle={
          "You can join project with email and password or by invitation."
        }
      >
        <form onSubmit={handleJoinProject} className="sm:w-[480px] text-black">
        <div className="mb-4 relative">
  <label className="text-sm block mb-1" htmlFor="project-id">
    Project Id
  </label>
  <input
    className={`border-[2px] ${
      valErr.nameErr
        ? "border-red-500 focus:outline-red-500"
        : "border-black"
    } block w-full px-3 py-2 rounded-lg `}
    placeholder="Enter project Id here"
    required
    onChange={(e) =>
      setFormData({ ...formData, projId: e.target.value })
    }
    value={formData.projId} // Ensure the input value is controlled
    type="text"
    name="project-id"
    id="project-id"
  />

  <div
    className="bg-gray-200 h-7 p-1 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer show-password-anim tooltip hover:tooltip-open flex items-center justify-center"
    data-tip="Paste"
    onClick={async () => {
      try {
        const clipboardText = await navigator.clipboard.readText(); // Read text from clipboard
        setFormData((prev) => ({ ...prev, projId: clipboardText })); // Update the state
      } catch (error) {
        console.error("Failed to read clipboard content:", error);
      }
    }}
  >
    <ImPaste />
  </div>

  {valErr.projIdErr && (
    <span className="absolute text-sm right-0 text-red-500 flex items-center gap-1">
      <MdError />
      {valErr.projIdErr}
    </span>
  )}
</div>

          <div className="relative">
            <label className="text-sm  block mb-1" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              className="border-[2px] border-black block w-full  px-3 py-2 rounded-lg"
              placeholder="########"
              required
              type={formData.show ? "text" : "password"}
              name="password"
              id="password"
            />
            <div
              ref={iconMenuRef}
              className="bg-gray-200 w-fit p-1 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer show-password-anim tooltip hover:tooltip-open"
              data-tip="Show password"
            >
              <div className="show-password-anim"></div>
            </div>
            {valErr.passErr && (
              <span className="absolute text-sm right-0 text-red-500 flex items-center gap-1">
                <MdError />
                {valErr.passErr}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="block bg-[#1a1a1a] mt-10 border-[#1a1a1a] border hover:bg-white hover:text-black font-[500] w-full text-white py-2.5 rounded-lg duration-500 active:scale-90"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </form>
      </TitleandSub>
    </div>
  );
};

export default JoinProject;
