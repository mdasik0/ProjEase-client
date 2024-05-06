import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin";
import Logo from "../../Shared/Logo";
import Register_Form from "./Register_Form";

const Register_FormSection = () => {
  return (
    <div className="h-5/6 w-1/3 ml-16">
      <div className="flex justify-between items-center mb-14">
        <Link className="ml-8" to={"/"}>
          <Logo />
        </Link>
        <div></div>
      </div>
      <Register_Form />
      <div className="divider text-sm my-10">OR</div>
      <div className="flex justify-center">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register_FormSection;
