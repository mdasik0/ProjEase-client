import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/features/userSlice";
import toast from "react-hot-toast";
import { MdAlternateEmail } from "react-icons/md";
import Lottie from "lottie-web";

const Login_Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    show: false,
  });

  const { isLoading, error, name, method } = useSelector(
    (state) => state.userSlice
  );

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
    } else if (method == "sign-in") {
      // Use else if to prevent both toasts from firing
      toast.success(`Welcome back ${name}`);
      navigate("/");
    }
  }, [error, method, name, navigate]);
  useEffect(() => {
    if (iconMenuRef.current) {
      const animationMenu = Lottie.loadAnimation({
        container: iconMenuRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "../../../../public/Visibility V3/visibility-V3.json",
      });
  
      // Set initial animation direction
      let directionMenu = -1;
  
      // Toggle animation direction
      const toggleAnimation = () => {
        animationMenu.setDirection(directionMenu);
        animationMenu.play();
  
        
        // Flip direction for next click
        directionMenu = -directionMenu;


        if (directionMenu === -1) {
          setFormData((prevData) => ({ ...prevData, show: false }));
        } else {
          setFormData((prevData) => ({ ...prevData, show: true }));
        }
      };
  
      // Attach the click event listener
      iconMenuRef.current.addEventListener("click", toggleAnimation);
  
      // Cleanup on component unmount
      return () => {
        iconMenuRef.current.removeEventListener("click", toggleAnimation);
        animationMenu.destroy();
      };
    }
  }, [setFormData]);
  
  

  return (
    <form onSubmit={handleSubmit} className="px-6">
      <div className="mb-10">
        <h2 className="text-5xl font-[500] mb-3">Login</h2>
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
      <div className="mb-4 relative">
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

      <div className="flex items-center justify-end mb-4">
        
        <span className="text-sm hover:underline hover:text-blue-500 duration-200 cursor-pointer">
          Forgot Password?
        </span>
      </div>
      <button
        type="submit"
        className="block bg-zinc-800 font-semibold w-full text-white py-2.5 rounded-lg hover:bg-zinc-700 duration-500 active:scale-90 mb-3"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <span>Submit</span>
        )}
      </button>
      <span className="text-sm w-full flex items-center gap-1 justify-end ">
        Don&apos;t have an Account?{" "}
        <Link
          to={`/auth/sign-up`}
          className="hover:underline hover:text-blue-500 duration-200 cursor-pointer"
        >
          Register!
        </Link>{" "}
      </span>
    </form>
  );
};

export default Login_Form;
