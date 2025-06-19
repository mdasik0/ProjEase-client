import { useDispatch, useSelector } from "react-redux";
import googleIcon from "/auth/google.png";
import { googleLogin } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "../../redux/api/userApi";

const SocialLogin = () => {
  const { isError, error, email, login_method, socialLoginLoading } =
    useSelector((state) => state.userSlice);

  const [createUser] = useCreateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  // no relation with social login
  const invitedUserNav = () => {
    const isInvited = JSON.parse(
      sessionStorage.getItem("JoinProject_with_invitation")
    );
    if (isInvited) {
      return navigate(`/join-project/token=${isInvited}`);
    } else {
      return navigate("/projects");
    }
  };

  const storeToken = (token, type) => {
    if (!token) {
      return console.error("No " + type + " available");
    }
    if (type === "accessToken") {
      return localStorage.setItem("authToken", token);
    } else {
      return localStorage.setItem("refreshToken", token);
    }
  };

  const createUserInBackend = async () => {
    try {
      const obj = {
        email,
        login_method: "google",
        created: new Date(),
      };
      const response = await createUser(obj);
      // Check if response has data
      if (!response) {
        toast.error("No response from server");
        return;
      }

      // Handle error response
      if (response.error) {
        console.error("API Error:", response.error);
        toast.error(response.error.data?.message || "Server error occurred");
        return;
      }

      const resData = response?.data;

      if (!resData) {
        toast.error("Invalid response from server");
        return;
      }

      console.log("Response data:", resData); // Debug log

      // Handle existing Google user
      if (resData.googleLogin === true) {
        toast.success(resData.message);

        // Store tokens
        if (resData.token && resData.refreshToken) {
          storeToken(resData.token, "accessToken");
          storeToken(resData.refreshToken, "refreshToken");
          console.log("Tokens stored successfully");
        } else {
          console.warn("Tokens missing in response");
        }

        // Redirect invited users
        invitedUserNav();
      }
      // Handle new user creation
      else if (resData.success === true) {
        toast.success(resData.message);

        // Store tokens
        if (resData.token && resData.refreshToken) {
          storeToken(resData.token, "accessToken");
          storeToken(resData.refreshToken, "refreshToken");
          console.log("Tokens stored successfully");
        } else {
          console.warn("Tokens missing in response");
        }

        // Navigate based on user completion status
        if (!resData.userNameExists) {
          return navigate("/auth/enter-your-name");
        }
        if (!resData.userImageExists) {
          return navigate("/auth/upload-profile-picture");
        } else {
          navigate("/");
        }
      }
      // Handle user already exists with email
      else if (resData.success === false) {
        toast.error(resData.message);
      }
      // Handle unexpected response
      else {
        console.warn("Unexpected response structure:", resData);
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error in createUserInBackend:", error);
      toast.error("An error occurred during authentication");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
    if (email && login_method === "google") {
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
