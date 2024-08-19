import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signUpUser } from "../../../redux/features/userSlice";
import { useCreateUserMutation } from "../../../redux/api/userApi";

const Register_Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    show: false,
  });

  const { isLoading, isError, error, name, email, image, method } = useSelector(
    (state) => state.userSlice
  );
  const [createUser, { data, isError: isServerError, error: serverError }] =
    useCreateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const password = newPassword;
    dispatch(signUpUser({ email, password, name }));
  };

  const handleBackendSubmit = async () => {
    const userData = {
      name,
      email,
      image,
      method,
      lastUpdated: "",
      created: new Date(),
      joinedProjects: [],
    };

    createUser(userData);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }

    if (email) {
      handleBackendSubmit();
    }
  }, [error, email]);

  useEffect(() => {
    if (data) {
      toast.success("Account has been created successfully");
      navigate("/");
    } 

    if (isServerError) {
      toast.error(serverError);
    }
  }, [data, isServerError, serverError, navigate]);

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
          onChange={handleChange}
          value={formData.name}
          className="border-[2px] border-gray-300 block w-full px-3 py-2 rounded-full"
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
          onChange={handleChange}
          value={formData.email}
          className="border-[2px] border-gray-300 block w-full px-3 py-2 rounded-full"
          placeholder="example@gmail.com"
          required
          type="email"
          name="email"
          id="email"
        />
      </div>
      <div className="mb-4">
        <label className="text-sm block mb-1" htmlFor="newPassword">
          New Password
        </label>
        <input
          onChange={handleChange}
          value={formData.newPassword}
          className="border-[2px] border-gray-300 block w-full px-3 py-2 rounded-full"
          placeholder="########"
          required
          type={formData.show ? "text" : "password"}
          name="newPassword"
          id="newPassword"
        />
      </div>
      <div className="mb-4">
        <label className="text-sm block mb-1" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          onChange={handleChange}
          value={formData.confirmPassword}
          className="border-[2px] border-gray-300 block w-full px-3 py-2 rounded-full"
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
            onChange={() =>
              setFormData((prevData) => ({
                ...prevData,
                show: !prevData.show,
              }))
            }
            checked={formData.show}
            className="cursor-pointer"
            type="checkbox"
            name="show"
            id="show"
          />
          <span className="text-sm">Show password</span>
        </div>
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
      <span className="text-sm w-full flex items-center gap-1 justify-end">
        Already have an Account?{" "}
        <Link
          to={`/auth/sign-in`}
          className="hover:underline hover:text-blue-500 duration-200 cursor-pointer"
        >
          Login!
        </Link>
      </span>
    </form>
  );
};

export default Register_Form;
