import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUser } from "../../../redux/features/userSlice";

const Register_Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    show: false,
  });

  const { isLoading, error, name } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.name;
    const email = formData.email;
    const newPassword = formData.newPassword;
    const confirmPassword = formData.confirmPassword;
    // let password;

    if(newPassword !== confirmPassword) {
      return toast.error('Passwords do not match')
    }

    if(newPassword.length < 8 || confirmPassword.length < 8) {
      return toast.error("Password is too short, Must be at least 8 characters")
    }

    const password = newPassword;

    console.log(name, email, password)

    dispatch(createUser({email, password, name}))    

  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (name) {
      toast.success(`welcome ${name}`);
      navigate('/')
    }
  }, [error, name]);
  return (
    <form onSubmit={handleSubmit} className="px-6">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold mb-3">Create an Account</h2>
        <p>Please enter your Name, Email & Passwords</p>
      </div>
      <div className="mb-4">
        <label className="text-sm block mb-1" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          className="border-[2px] border-gray-300 block w-full  px-3 py-2 rounded-full"
          placeholder="John Doe"
          required
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div className="mb-4">
        <label className="text-sm block mb-1" htmlFor="email">
          Email
        </label>
        <input
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          className="border-[2px] border-gray-300 block w-full  px-3 py-2 rounded-full"
          placeholder="example@gmail.com"
          required
          type="email"
          name="email"
          id="email"
        />
      </div>
      <div className="mb-4">
        <label className="text-sm  block mb-1" htmlFor="newPassword">
         New Password
        </label>
        <input
          onChange={(e) => {
            setFormData({ ...formData, newPassword: e.target.value });
          }}
          className="border-[2px] border-gray-300 block w-full  px-3 py-2 rounded-full"
          placeholder="########"
          required
          type={formData.show ? "text" : "password"}
          name="newPassword"
          id="newPassword"
        />
      </div>
      <div className="mb-4">
        <label className="text-sm  block mb-1" htmlFor="confirmPassword">
         Confirm Password
        </label>
        <input
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
          }}
          className="border-[2px] border-gray-300 block w-full  px-3 py-2 rounded-full"
          placeholder="########"
          required
          type={formData.show ? "text" : "password"}
          name="confirmPassword"
          id="confirmPassword"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <input
            onChange={() => {
              setFormData({ ...formData, show: !formData.show });
            }}
            className="cursor-pointer"
            type="checkbox"
            name="show"
            id="show"
          />{" "}
          <span className="text-sm">Show password</span>
          
        </div>
        {/* <span className="text-sm hover:underline hover:text-blue-500 duration-200 cursor-pointer">
          Forgot Password?
        </span> */}
      </div>
      <button
        type="submit"
        className="block bg-zinc-800 font-semibold w-full text-white py-2.5 rounded-full hover:bg-zinc-700 duration-500 active:scale-90 mb-3"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <span>Submit</span>
        )}
      </button>
      <span className="text-sm w-full flex items-center gap-1 justify-end ">
        Already have an Account?{" "}
        <Link
          to={`/auth/sign-in`}
          className="hover:underline hover:text-blue-500 duration-200 cursor-pointer"
        >
          Login!
        </Link>{" "}
      </span>
    </form>
  );
};

export default Register_Form;
