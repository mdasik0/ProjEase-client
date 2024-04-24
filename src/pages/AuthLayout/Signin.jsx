import { useState } from "react";

const Signin = () => {
  const [user, setUser] = useState({ email: "", password: "", show: false });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(user);
    };
  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            className="border-[2px]"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            className="border-[2px]"
            type={user.show ? "text" : "password"}
            name="password"
            id="password"
          />
        </div>
        <input
          onChange={() => {
            setUser({ ...user, show: !user.show });
          }}
          type="checkbox"
          name="show"
          id="show"
        /> show password
        <button type="submit" className="block bg-zinc-500 text-white p-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signin;
