import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/features/userSlice";
import toast from "react-hot-toast";
import { MdAlternateEmail } from "react-icons/md";
import Lottie from "lottie-web";
import { BiError } from "react-icons/bi";
import { useEmailLoginQuery } from "../../../redux/api/userApi";

const Login_Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    show: false,
  });

  //is login form complete?
  //does it logs the user? yes
  //when the user logs in with firebase and formData.email used to fetch user data from backend? yes
  //does it fetchs user data from backend upon login? yes
  //does it checks if the user has entered a new name? don't know
  //does it checks if the user has entered a new profile picture? don't know

  const { isLoading, error, email, login_method } = useSelector(
    (state) => state.userSlice
  );
  const shouldFetchEmailData = email && login_method === 'email-login';

const { data: userData } = useEmailLoginQuery(formData.email, { skip: !shouldFetchEmailData });


  const iconMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    else if (email && login_method === 'email-login') {
      console.log(userData)
      if (userData.success === true) {
        toast.success(userData.message)
        // name check
        if(!userData.userNameExists) {
          navigate("/profileUpdate/enter-your-name");
        }
        //profile picture check
        if (!userData.userImageExists) {
          navigate("/profileUpdate/upload-profile-picture");
        } 
        else {
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
        <div className="bg-gray-200 w-fit p-1.5 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer tooltip hover:tooltip-open" data-tip='Email'>
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
          className="bg-gray-200 w-fit p-1 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer show-password-anim tooltip hover:tooltip-open" data-tip="Show password"
        >
          <div className="show-password-anim"></div>
        </div>
      </div> 

      <div className="flex items-center justify-between mb-4 mt-1">
        <p className={`text-sm text-red-500 flex items-center gap-1 font-[500] ${error ? "opacity-100" : "opacity-0"}`}><BiError />{error}</p>
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
