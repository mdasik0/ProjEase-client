import { useState } from "react";
import AuthNav from "../../components/AuthLayout/AuthNav";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    newpassword: "",
    confirmpassword: "",
    show: false,
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <AuthNav />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="border-[2px]"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="border-[2px]"
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            className="border-[2px]"
            onChange={(e) => {
              setUser({ ...user, newpassword: e.target.value });
            }}
            type={user.show ? "text" : "password"}
            name="newPassword"
            id="newPassword"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="border-[2px]"
            onChange={(e) => {
              setUser({ ...user, confirmpassword: e.target.value });
            }}
            type={user.show ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>
        <input
          onChange={() => {
            setUser({ ...user, show: !user.show });
          }}
          type="checkbox"
          name="show"
          id="show"
        />{" "}
        show password
        <button type="submit" className="block bg-zinc-500 text-white p-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
