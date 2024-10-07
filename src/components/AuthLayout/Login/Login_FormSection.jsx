import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin";
import Login_Form from "./Login_Form";

const Login_FormSection = () => {
  return (
    <div className="h-5/6 w-1/3 ml-16">
      <div className="flex justify-between items-center mb-14">
        <Link className="ml-8" to={"/"}>
        </Link>
        <div></div>
      </div>
      <Login_Form />
      <div className="divider text-sm my-10">OR</div>
      <div className="flex justify-center">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login_FormSection;
