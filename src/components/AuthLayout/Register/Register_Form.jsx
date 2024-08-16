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
  
  //! retrive data from redux store
  const { isLoading,isError, error, name, email, image } = useSelector(
    (state) => state.userSlice
  );
  //! createUser api from rtk query
  const [createUser, { data, isError: isServerError, error: serverError }] =
    useCreateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ! handling inputs on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.name;
    const email = formData.email;
    const newPassword = formData.newPassword;
    const confirmPassword = formData.confirmPassword;
    // let password;
    
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    
    const password = newPassword;
    
    //! Submitting user data to the async thunk for creating a new user in Firebase
    dispatch(signUpUser({ email, password, name }));
  };
  
  
  //! managing toast on success/rejection
  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
    if (email) {
      handleBackendSubmit();
    }
  }, [error, email]);
  

  //! sending data to backend
    const handleBackendSubmit = async () => {
      const obj = {
        name,
        email,
        image,
        lastUpdated: "",
        created: new Date(),
        joinedProjects: [],
      };
    
      createUser(obj)
    };

    //! toast for a new user created successfully
    useEffect(()=>{
      if(data) {
        toast.success("Account has been created successfully")
       return navigate("/")
      } 
      if(isServerError) {
        toast.error(serverError)
      }
    },[data, isServerError, serverError, navigate])






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
