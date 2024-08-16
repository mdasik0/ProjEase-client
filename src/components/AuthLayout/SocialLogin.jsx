import { useDispatch, useSelector } from "react-redux";
import googleIcon from "/public/auth/google.png";
import { googleLogin } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
const SocialLogin = () => {
  //! handle google login
  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };
  const { error, name, method } = useSelector(
    (state) => state.userSlice
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (method == "google") {
      toast.success(`Welcome back ${name}`);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [error, method, name, navigate]);

  return (
    <>
      {/* google */}
      <div
        onClick={() => handleGoogleLogin()}
        className="flex items-center justify-center gap-3 border-2 border-gray-300 p-2 rounded-full w-full mx-6  pr-6 hover:bg-gray-300 duration-500 cursor-pointer"
      >
        <img
          className="w-7 h-7 object-cover"
          alt="google social icon"
          src={googleIcon}
        />
        <span className="text-black hover:text-black">
          Login with Google</span>
      </div>
    </>
  );
};

export default SocialLogin;
