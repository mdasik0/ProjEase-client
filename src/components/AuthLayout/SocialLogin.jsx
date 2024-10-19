import { useDispatch, useSelector } from "react-redux";
import googleIcon from "/public/auth/google.png";
import { googleLogin } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "../../redux/api/userApi";
const SocialLogin = () => {
  const { isError, error, email, login_method, socialLoginLoading } = useSelector(
    (state) => state.userSlice
  );

  const [createUser] = useCreateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  const createUserInBackend = async () => {
    const obj = {
      email,
      login_method: "google",
      created: new Date(),
    };

    const response = await createUser(obj);

    if (response?.data?.success === false) {
      toast.success(response.data.message);
      if (!response.data.userNameExists) {
       return navigate("/profileUpdate/enter-your-name");
      }
      if (!response.data.userImageExists) {
       return navigate("/profileUpdate/upload-profile-picture");
      }
    } else if (response?.data?.success === true) {
      toast.success(response.data.message);
      if (!response.data.userNameExists) {
        return navigate("/profileUpdate/enter-your-name");
      }
      if (!response.data.userImageExists) {
       return  navigate("/profileUpdate/upload-profile-picture");
      }
      console.log("User has been created successfully.");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
    if (email && login_method === 'google-login') {
      createUserInBackend();
    }
  }, [error, email, isError, login_method]);

  return (
    <>
      {/* google */}
      <div
        onClick={() => handleGoogleLogin()}
        className="flex items-center justify-center gap-3 border-2 border-gray-300 p-2 rounded-lg w-full mx-6 pr-6 hover:bg-gray-300 duration-500 cursor-pointer"
      >
        <img
          className="w-7 h-7 object-cover"
          alt="google social icon"
          src={googleIcon}
        />
        {socialLoginLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <span className="text-black hover:text-black">Login with Google</span>
        )}
      </div>
    </>
  );
};

export default SocialLogin;
