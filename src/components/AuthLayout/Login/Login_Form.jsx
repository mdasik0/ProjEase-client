import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, setUserData } from "../../../redux/features/userSlice";
import toast from "react-hot-toast";
import { MdAlternateEmail } from "react-icons/md";
import Lottie from "lottie-web";
import { BiError } from "react-icons/bi";
import { useEmailLoginQuery } from "../../../redux/api/userApi";

const Login_Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    show: false,
  });
  
  const dispatch = useDispatch();
  //step:1 - firebase login
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    dispatch(loginUser({ email, password }));
  };
  
  //step:2 - manipulate ui based on redux state
  const { isLoading, error, email, login_method } = useSelector(
    (state) => state.userSlice
  );
  
  
  //step:3 - fetching login user data after firebase auth
  const shouldFetchEmailData = email && login_method === "email";
  const { data: userData } = useEmailLoginQuery(formData.email, {
    skip: !shouldFetchEmailData,
  });
  
  //step:4 - after login data from backend store tokens
  const storeToken = (token, type) => {
    if (!token) {
      return console.error("No" + type + "available");
    }
    if (type === "accessToken") {
      return localStorage.setItem("authToken", token);
    } else {
      return localStorage.setItem("refreshToken", token)
    }
  };

  //not related
  const AfterLoginNav = useCallback(() => {  
    const isInvited = JSON.parse(
      sessionStorage.getItem("JoinProject_with_invitation")
    )
    if (isInvited) {
      return navigate(`/join-project/token=${isInvited}`);
    } else {
      return navigate("/");
    }
    
  },[navigate])

  //ui manipulation and token storing
  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (email && login_method === "email") {
      if (userData?.success === true) {
        toast.success(userData?.message);
        storeToken(userData?.token, 'accessToken');
        storeToken(userData?.refreshToken, 'refreshToken');
        dispatch(setUserData(userData.userData));
        AfterLoginNav();

      }
    }
  }, [error, email, navigate, userData,login_method,AfterLoginNav]);
  
  
  
  
  
  //ui element
  const iconMenuRef = useRef(null);
  useEffect(() => {
    const iconRef = iconMenuRef.current
    if (iconRef) {
      const animationMenu = Lottie.loadAnimation({
        container: iconRef,
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

      iconRef.addEventListener("click", toggleAnimation);

      return () => {
        if (iconRef) {
          iconRef.removeEventListener("click", toggleAnimation);
        }
        animationMenu.destroy();
      };
    }
  }, [setFormData]);

  return (
    <form onSubmit={handleSubmit} className="px-6">
      <div className="mb-8">
        <h2 className="text-[2.5rem] font-[500]">Login</h2>
        <p className="text-gray-500">Please enter your email & password</p>
      </div>
      <div className="mb-4 relative">
        <label className="text-sm block mb-1" htmlFor="email">
          Email
        </label>
        <input
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          className="border-[2px] border-gray-300 block w-full  px-3 py-2 rounded-lg"
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
      </div>
      <div className="relative">
        <label className="text-sm  block mb-1" htmlFor="password">
          Password
        </label>
        <input
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          className="border-[2px] border-gray-300 block w-full  px-3 py-2 rounded-lg"
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
      </div>

      <div className="flex items-center justify-between mb-4 mt-1">
        <p
          className={`text-sm text-red-500 flex items-center gap-1 font-[500] ${
            error ? "opacity-100" : "opacity-0"
          }`}
        >
          <BiError />
          {error}
        </p>
        <span className="text-sm hover:underline hover:text-blue-500 duration-200 cursor-pointer">
          Forgot Password?
        </span>
      </div>
      <button
        type="submit"
        className="block bg-[#1a1a1a] border-[#1a1a1a] border hover:bg-white hover:text-black font-[500] w-full text-white py-2.5 rounded-lg duration-500 active:scale-90"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <span>Submit</span>
        )}
      </button>
    </form>
  );
};

export default Login_Form;
