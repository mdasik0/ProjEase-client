import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../redux/features/userSlice";
import toast from "react-hot-toast";

const Login_Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    show: false,
  });

  const { isLoading, error, name } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    dispatch(loginUser({ email, password }));
    console.log(email, password);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (name) {
      toast.success(`welcome ${name}`);
    }
  }, [error, name]);
  return (
    <form onSubmit={handleSubmit} className="px-6">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold mb-3">Welcome Back!</h2>
        <p>Please enter your email & password</p>
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
        <label className="text-sm  block mb-1" htmlFor="password">
          Password
        </label>
        <input
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          className="border-[2px] border-gray-300 block w-full  px-3 py-2 rounded-full"
          placeholder="########"
          required
          type={formData.show ? "text" : "password"}
          name="password"
          id="password"
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
        <span className="text-sm hover:underline hover:text-blue-500 duration-200 cursor-pointer">
          Forgot Password?
        </span>
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
