import { useDispatch, useSelector } from "react-redux";
import googleIcon from "/public/auth/google.png";
import { googleLogin } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "../../redux/api/userApi";
const SocialLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //! createUser api from rtk query
  const [createUser, { data, isError: isServerError, error: serverError }] =
    useCreateUserMutation();

  //! handle google login
  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  const { isError, error, name, email, image, method } = useSelector(
    (state) => state.userSlice
  );

  //! managing toast on success/rejection
  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
    if (email) {
      createUserInBackend();
    }
  }, [error, email, isError]);

  //! sending data to backend
  const createUserInBackend = async () => {
    const obj = {
      image,
      name,
      email,
      method,
      lastUpdated: "",
      created: new Date(),
      joinedProjects: [],
    };

    createUser(obj);
  };

  //! toast for a new user created successfully
  useEffect(() => {
    if (data) {
      toast.success("Welcome Back");
      return navigate("/");
    }
    if (isServerError) {
      toast.error(serverError);
      return navigate("/");
    }
  }, [data, isServerError, serverError, navigate]);

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
        <span className="text-black hover:text-black">Login with Google</span>
      </div>
    </>
  );
};

export default SocialLogin;
