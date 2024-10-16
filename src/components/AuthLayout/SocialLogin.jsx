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

  const [createUser, { data, isSuccess }] = useCreateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //social login logic
  // user is already not authenticated done
  // if not email redux state store done
  // if not database data store {email, method, created} done
  // if not redirect to the name creation page
  // user already authenticated. done
  // fetch user information from database
  // if the user has no name then redirect to the name creation page
  // if the user has no image then redirect to the profile picture upload page.

  //! createUser api from rtk query

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  // SocialLogin Component

  const createUserInBackend = async () => {
    const obj = {
      email,
      login_method: "google",
      created: new Date(),
    };

    const response = await createUser(obj);
    console.log(response);
    if (response?.data?.success === false) {
      toast.success(response.data.message);
      if (!response.data.userImageExists) {
        navigate("/profileUpdate/upload-profile-picture");
      }
      if (!response.data.userNameExists) {
        navigate("/profileUpdate/enter-your-name");
      }
      // response.data.userImageExists = এটা ব্যাবহার করে জানা যাবে যে ইউজারটি কি নিজের ছবি অলরেডি আপলোড করেছে কিনা।
      // response.data.userNameExists = এর মাধ্যমে জানা যাবে যে ইউজারটি কি তার নতুন নাম দিয়েছে কিনা।
      // এগুলোর মাধ্যমে ইউজারকে একটি পেজে redirect করতে পারি।
    } else if (response?.data?.success === true) {
      toast.success(response.data.message);
      if (!response.data.userImageExists) {
        navigate("/profileUpdate/upload-profile-picture");
      }
      if (!response.data.userNameExists) {
        navigate("/profileUpdate/enter-your-name");
      }
      console.log("User has been created successfully.");
    }
  };

  // Use Effect with Additional Logs
  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
    
    if (email && login_method === 'google-login') {
      createUserInBackend();
    }
  }, [error, email, isError, login_method, isSuccess, data]);

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
