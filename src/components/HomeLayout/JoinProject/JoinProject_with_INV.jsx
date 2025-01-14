import PropTypes from "prop-types";
import TitleandSub from "../../ProjectLayout/TitleandSub";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-web";
import { useDispatch, useSelector } from "react-redux";
import { useJoinProjectMutation } from "../../../redux/api/projectsApi";
import toast from "react-hot-toast";
import { resetTaskSlice } from "../../../redux/features/tasksSlice";
import { resetProjSlice } from "../../../redux/features/projectSlice";

const JoinProject_with_INV = ({ data, email, userLoading }) => {
  const [password, setPassword] = useState({ password: "", show: false });
  const { userData } = useSelector((state) => state.userSlice);
  const [joinProject, { isLoading }] = useJoinProjectMutation();

  const iconMenuRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleJoin = async () => {
    const info = {
      projId: data?.projectId,
      password: password.password,
      userId: userData?._id,
      invited: true,
    };

    try {
      const response = await joinProject(info);
      if (response.data) {
        toast.success(response.data.message);
        sessionStorage.removeItem("JoinProject_with_invitation");
        dispatch(resetTaskSlice());
        dispatch(resetProjSlice());
        navigate("/");
      } else if (response.error) {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const iconrefCurrent = iconMenuRef.current;
    if (iconrefCurrent) {
      const animationMenu = Lottie.loadAnimation({
        container: iconrefCurrent,
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
        setPassword((prevData) => ({ ...prevData, show: directionMenu === 1 }));
      };

      iconrefCurrent.addEventListener("click", toggleAnimation);

      return () => {
        iconrefCurrent.removeEventListener("click", toggleAnimation);
        animationMenu.destroy();
      };
    }
  }, []);

  return (
    <div className="p-10">
      <TitleandSub
        title={"join project"}
        subTitle={
          "You can join project with email and password or by invitation."
        }
      >
        <div className="border border-yellow-500 p-3 rounded-lg w-1/2 mt-10 bg-yellow-100 mb-3">
          <p className="font-[400] mb-1.5 text-black text-lg">
            Hi there! {data?.email?.split("@")[0]} 👋
          </p>{" "}
          You&apos;ve been invited by{" "}
          <span className="font-[500] text-black">
            {data?.senderName?.firstname + " " + data?.senderName?.lastname}
          </span>{" "}
          to join the project :{" "}
          <span className="font-[500] text-black">
            {'"' + data?.projectName + '"'}
          </span>{" "}
          on ProjEase . Here, you can collaborate with your team, manage tasks,
          and stay connected.
        </div>

        {!email
          ? !userLoading && (
              <div className="mt-6">
                <h4 className="text-lg text-black font-[500] mb-3">
                  Oh, hey! You don’t seem to be logged in.
                </h4>
                <ul className="flex flex-col gap-2 text-black ml-6">
                  <li className="list-disc">
                    Already have an account?{" "}
                    <Link
                      className="text-blue-600 font-[500] hover:duration-500 hover:underline hover:underline-offset-2"
                      to={"/auth/sign-in"}
                    >
                      Log in
                    </Link>{" "}
                    to accept the invitation and start collaborating!
                  </li>
                  <li className="list-disc">
                    New to ProjEase? No worries!{" "}
                    <Link
                      className="text-blue-600 font-[500] hover:duration-500 hover:underline hover:underline-offset-2"
                      to={"/auth/sign-up"}
                    >
                      Registering an account
                    </Link>{" "}
                    is quick and easy.
                  </li>
                </ul>
              </div>
            )
          : !userLoading && (
              <div className="w-[350px]">
                {data?.isPrivate && (
                  <div className="relative ">
                    <label className="text-sm  block mb-1" htmlFor="password">
                      Password
                    </label>
                    <input
                      onChange={(e) => {
                        setPassword({ ...password, password: e.target.value });
                      }}
                      className="border-[2px] border-black block w-full  px-3 py-2 rounded-lg"
                      placeholder="########"
                      required
                      type={password.show ? "text" : "password"}
                      name="password"
                      id="password"
                    />
                    <div
                      ref={iconMenuRef}
                      className="bg-gray-200 w-fit p-1 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer"
                      data-tip="Show password"
                    ></div>
                  </div>
                )}

                <button
                  onClick={handleJoin}
                  className={`btn text-gray-200 bg-[#1a1a1a] hover:text-black w-full ${
                    data?.isPrivate ? "mt-3" : "mt-6"
                  }  font-normal`}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      Join project
                    </span>
                  )}
                </button>
              </div>
            )}
      </TitleandSub>
    </div>
  );
};

JoinProject_with_INV.propTypes = {
  email: PropTypes.string,
  userLoading: PropTypes.bool,
  data: PropTypes.shape({
    email: PropTypes.string,
    isPrivate: PropTypes.bool,
    isUsed: PropTypes.bool,
    projectId: PropTypes.string,
    projectName: PropTypes.string,
    name: PropTypes.string,
    senderName: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    }),
  }),
};

export default JoinProject_with_INV;
