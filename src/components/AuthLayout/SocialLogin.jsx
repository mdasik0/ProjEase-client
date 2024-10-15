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

  //social login logic
  // user is already not authenticated
  // if not email redux state store
  // if not database data store {email, method, created}
  // if not redirect to the name creation page
  // user already authenticated.
  // fetch user information from database
  // if the user has no name then redirect to the name creation page
  // if the user has no image then redirect to the profile picture upload page.

  //! createUser api from rtk query
  const [createUser, { data, isError: isServerError, error: serverError }] = useCreateUserMutation();

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  const { isError, error, email, isLoading } = useSelector(
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
      email,
      created: new Date(),
    };

    createUser(obj);
  };

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
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <span className="text-black hover:text-black">Login with Google</span>
        )}
      </div>
    </>
  );
};

export default SocialLogin;
