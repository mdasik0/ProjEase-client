import { useState } from "react";

const Login_Form = () => {
    const [user, setUser] = useState({ email: "", password: "", show: false });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(user);
    };
    return (
        <form onSubmit={handleSubmit} className="px-6">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold mb-3">Welcome Back!</h2>
            <p>please enter your email & password</p>
          </div>
        <div className="mb-4">
          <label className="text-sm block mb-1" htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            className="border-[2px] block w-full rounded px-2 py-1"
            placeholder="eg@gmail.com"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm  block mb-1" htmlFor="password">Password</label>
          <input
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            className="border-[2px] block w-full rounded px-2 py-1"
            placeholder="**********"
            type={user.show ? "text" : "password"}
            name="password"
            id="password"
          />
        </div>
        
        <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
        <input
          onChange={() => {
            setUser({ ...user, show: !user.show });
          }}
          className="cursor-pointer"
          type="checkbox"
          name="show"
          id="show"
        /> <span className="text-sm">show password</span>
        </div>
        <span className="text-sm hover:underline hover:text-blue-500 duration-200 cursor-pointer">Forgot Password?</span>
        </div>
        <button type="submit" className="block bg-zinc-800 rounded w-full text-white py-2 hover:bg-zinc-700 duration-500 active:scale-90">
          Submit
        </button>
      </form>
    );
};

export default Login_Form;