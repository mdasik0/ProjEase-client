import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  MdAlternateEmail,
  MdError,
  MdOutlineDoNotDisturb,
} from "react-icons/md";
import Lottie from "lottie-web";
import userApi, { useCreateUserMutation } from "../../../redux/api/userApi";
import { refetchUpdate, signUpUser } from "../../../redux/features/userSlice";

const Register_Form = () => {
  const { isLoading, isError, error, email, login_method } = useSelector(
    (state) => state.userSlice
  );

  const iconMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    show: false,
  });

  const [RTError, setRTError] = useState({
    emailError: false,
    emailErrMessage: "",
    passwordError: false,
    passwordErrMessage: "",
    passwordStrength: "",
  });

  const emailRTCheck = (e) => {
    e.preventDefault();
    const email = e.target.value;
    setFormData({ ...formData, email: email });
    if (!email || !/^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(email)) {
      setRTError({
        ...RTError,
        emailErrMessage: "Enter a valid email address",
        emailError: true,
      });
    } else {
      setRTError({ ...RTError, emailErrMessage: "", emailError: false });
    }
  };

  const passwordRTCheck = (e) => {
    e.preventDefault();
    const password = e.target.value;
    setFormData({ ...formData, password: password });

    if (!password) {
      setRTError({
        ...RTError,
        passwordError: true,
        passwordErrMessage: "Please enter a password",
        passwordStrength: "",
      });
    }
    // First, check for minimum length
    else if (password.length < 8) {
      setRTError({
        ...RTError,
        passwordError: true,
        passwordErrMessage: "Password must be at least 8 characters long",
        passwordStrength: "",
      });
    }

    // Weak password: Contains only one type (numbers, characters, or symbols)
    else {
      if (/^(?:\d+|[a-zA-Z]+|[^a-zA-Z\d]+)$/.test(password)) {
        setRTError({
          ...RTError,
          passwordError: false,
          passwordErrMessage: "Weak password",
          passwordStrength: "weak",
        });
      }
      // Medium password: Contains exactly 2 types (numbers + characters, characters + symbols, or numbers + symbols)
      else if (
        /(?=.*[A-Za-z])(?=.*\d)(?!.*[!@#$%^&*()]).{8,}$/.test(password) ||
        /(?=.*[A-Za-z])(?=.*[!@#$%^&*()])(?!.*\d).{8,}$/.test(password) ||
        /(?=.*\d)(?=.*[!@#$%^&*()])(?!.*[A-Za-z]).{8,}$/.test(password)
      ) {
        setRTError({
          ...RTError,
          passwordError: false,
          passwordErrMessage: "Medium password",
          passwordStrength: "medium",
        });
      }
      // Strong password: Contains all 3 types (numbers + characters + symbols)
      //note: if any repitative characters are used like 12345 or $$$$$$ it will be considered medium strength password even if there is all types of characters avaiable and even if it exceeds 8 characters.
      else if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:<>?~]).{8,}$/.test(
          password
        )
      ) {
        setRTError({
          ...RTError,
          passwordError: false,
          passwordErrMessage: "Strong password",
          passwordStrength: "strong",
        });
      }
      // Reset in case no errors
      else {
        setRTError({
          ...RTError,
          passwordError: false,
          passwordStrength: "",
          passwordErrMessage: "",
        });
      }
    }
  };

  const [createUser] = useCreateUserMutation();

  const createUserInBackend = async () => {
    try {
      const obj = {
        email,
        login_method: "email",
        created: new Date(),
      };
  
      const response = await createUser(obj);
  
      if (!response?.data?.success) {
        return toast.error(response.data.message);
      }
  
      const fetchTheUser = await dispatch(userApi.endpoints.getUser.initiate(email)).unwrap();
      dispatch(refetchUpdate(fetchTheUser));
  
      // Navigate based on user data
      if (!response.data.userNameExists) {
        navigate("/auth/enter-your-name");
      } else if (!response.data.userImageExists) {
        navigate("/auth/upload-profile-picture");
      } else {
        navigate("/");
      }
  
      toast.success(response.data.message);
    } catch (error) {
      // Handle errors during API calls or dispatch
      toast.error("There was an error. Please refresh the page");
      console.error(error);
  
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    dispatch(signUpUser({ email, password }));
    setRTError({
      emailError: false,
      emailErrMessage: "",
      passwordError: false,
      passwordErrMessage: "",
      passwordStrength: "",
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
    if (email && login_method === "email") {
      createUserInBackend();
    }
  }, [isError, error, email, navigate, login_method]);

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
    <form onSubmit={handleSubmit} className="px-6">
      <div className="mb-8">
        <h2 className="text-[2.5rem] font-[500]">Register</h2>
        <p className="text-gray-500">Please enter your email & password</p>
      </div>
      <div className="mb-4 relative">
        <label className="text-sm block mb-1" htmlFor="email">
          Email
        </label>
        <input
          onChange={(e) => {
            emailRTCheck(e);
          }}
          className={`border-[2px] duration-500  ${
            RTError.emailError
              ? "focus:outline-red-500 border-red-300"
              : "focus:outline-green-500"
          } border-gray-300 block w-full  px-3 py-2 rounded-lg`}
          placeholder="example@gmail.com"
          required
          type="email"
          name="email"
          id="email"
        />
        <div
          className="bg-gray-200 w-fit p-1.5 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer tooltip hover:tooltip-open"
          data-tip="Email"
        >
          <MdAlternateEmail />
        </div>
        <div
          id="Email-Error"
          className="flex items-center absolute right-0 -bottom-5"
        >
          <p
            className={`text-sm text-red-500 flex items-center gap-1 ${
              RTError.emailError ? "opacity-100" : "opacity-0"
            }`}
          >
            <MdError className="text-base" />
            {RTError.emailErrMessage}
          </p>
        </div>
      </div>
      <div className="relative mb-10">
        <label className="text-sm  block mb-1" htmlFor="password">
          Password
        </label>
        <input
          onChange={(e) => {
            passwordRTCheck(e);
          }}
          className={`border-[2px] duration-500 
    ${
      RTError.passwordStrength === "weak"
        ? "focus:outline-yellow-500 border-yellow-500"
        : RTError.passwordStrength === "medium"
        ? "focus:outline-pink-500 border-orange-500"
        : RTError.passwordStrength === "strong"
        ? "focus:outline-green-500 border-green-500"
        : "border-gray-300"
    } 
    block w-full px-3 py-2 rounded-lg`}
          placeholder="########"
          required
          type={formData.show ? "text" : "password"}
          name="password"
          id="password"
        />

        <div
          ref={iconMenuRef} // Attach the ref to the container
          className="bg-gray-200 w-fit p-1 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer show-password-anim tooltip hover:tooltip-open"
          data-tip="Show password"
        >
          <div className="show-password-anim"></div>
        </div>
        <div
          id="Password-Error"
          className="flex items-center absolute right-0 -bottom-5"
        >
          <p
            className={`text-sm
              ${
                RTError.passwordStrength === "weak"
                  ? "text-yellow-500"
                  : RTError.passwordStrength === "medium"
                  ? "text-orange-500"
                  : RTError.passwordStrength === "strong"
                  ? "text-green-500"
                  : "text-red-500"
              }
              
              flex items-center gap-1 ${
                RTError.passwordErrMessage ? "opacity-100" : "opacity-0"
              }`}
          >
            <MdError className="text-base" />
            {RTError.passwordErrMessage}
          </p>
        </div>
      </div>

      <button
        disabled={RTError.passwordError || RTError.emailError}
        type="submit"
        className="block bg-[#1a1a1a] border-[#1a1a1a] border disabled:bg-gray-500 disabled:border-gray-500 disabled:text-white  hover:bg-white hover:text-black font-[500] w-full text-white py-2.5 rounded-lg duration-500 active:scale-90"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            {(RTError.passwordError || RTError.emailError) && (
              <MdOutlineDoNotDisturb className="text-lg" />
            )}
            Submit
          </span>
        )}
      </button>
    </form>
  );
};

export default Register_Form;
