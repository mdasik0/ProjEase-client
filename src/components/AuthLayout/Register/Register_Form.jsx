import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdAlternateEmail, MdError } from "react-icons/md";
import Lottie from "lottie-web";
import { BiError } from "react-icons/bi";
import { useEmailLoginQuery } from "../../../redux/api/userApi";

const Register_Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    show: false,
  });

  const [RTError, setRTError] = useState({ emailError: "", passwordError: "", passwordStrength: '' });

  const emailRTCheck = (e) => {
    e.preventDefault();
    const email = e.target.value;
    setFormData({ ...formData, email: email });
    if (!email || !/^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(email)) {
      setRTError({ ...RTError, emailError: "Enter a valid email address" });
    } else {
      setRTError({ ...RTError, emailError: "" });
    }
  };

  const passwordRTCheck = (e) => {
    e.preventDefault();
    const password = e.target.value;
    setFormData({ ...formData, password: password });
    if (!password) {
      setRTError({ ...RTError, passwordError: "Please enter a password" });
    } else if (/^(?:\d+|[a-zA-Z]+|[^a-zA-Z\d]+)$/.test(password)) {
      setRTError({ ...RTError, passwordError: "Weak password ", passwordStrength: 'weak' });
    } else {
      setRTError({ ...RTError, passwordError: "", passwordStrength: '' });
    }
  };
  //is register form complete?
  //when a user enters an invalid email does it gives an error?
  //when a user enters an email that already exists in database does it give an error?
  //when a user enters an weak medium and strong password does it gives an warning?
  //until user enters an proper email and password, does the submit button stays disabled until then?
  //once the user creates a new account, does it checks that user's account is created or not? and redirects them to the name creation page?

  const { isLoading, error, email, login_method } = useSelector(
    (state) => state.userSlice
  );
  const shouldFetchEmailData = email && login_method === "email-login";

  const { data: userData } = useEmailLoginQuery(formData.email, {
    skip: !shouldFetchEmailData,
  });

  const iconMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    // dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (email && login_method === "email-login") {
      console.log(userData);
      if (userData.success === true) {
        toast.success(userData.message);
        // name check
        if (!userData.userNameExists) {
          navigate("/profileUpdate/enter-your-name");
        }
        //profile picture check
        if (!userData.userImageExists) {
          navigate("/profileUpdate/upload-profile-picture");
        } else {
          navigate("/");
        }
      }
    }
  }, [error, email, navigate, userData]);

  useEffect(() => {
    if (iconMenuRef.current) {
      const animationMenu = Lottie.loadAnimation({
        container: iconMenuRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "../../../../public/Visibility V3/visibility-V3.json",
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
            {RTError.emailError}
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
    ${RTError.passwordStrength === 'weak' ? 'focus:outline-yellow-500 border-yellow-500' : 
      RTError.passwordStrength === 'medium' ? 'focus:outline-pink-500 border-orange-500' : 
      RTError.passwordStrength === 'strong' ? 'focus:outline-green-500 border-green-500' : 
      'border-gray-300'} 
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
              ${RTError.passwordStrength === 'weak' ? 'text-yellow-500' : 
                RTError.passwordStrength === 'medium' ? 'text-orange-500' : 
                RTError.passwordStrength === 'strong' ? 'text-green-500' : 
                'text-red-500'}
              
              flex items-center gap-1 ${
              RTError.passwordError ? "opacity-100" : "opacity-0"
            }`}
          >
            <MdError className="text-base" />
            {RTError.passwordError}
          </p>
        </div>
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

export default Register_Form;
