import SocialLogin from "../SocialLogin";
import Register_Form from "./Register_Form";

const Register_FormSection = () => {
  return (
    <div className="flex-grow bg-white px-8 py-16 lg:w-auto w-full rounded-3xl">
      <Register_Form />
      <div className="divider text-xs my-8 w-1/3 mx-auto">OR</div>
      <div className="flex justify-center">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register_FormSection;
