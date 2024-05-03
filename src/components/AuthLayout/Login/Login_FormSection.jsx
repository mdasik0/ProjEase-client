import Login_Form from "./Login_Form";

const Login_FormSection = () => {
  return (
    <div className="h-5/6 w-1/3 ml-16">
      <div className="flex justify-between items-center mb-14">
        <figure className="font-bold text-4xl ">Logo</figure>
        <div>
        </div>
      </div>
      <Login_Form />
      <div className="divider text-sm my-10">OR</div>
      <div>
        Google Login
      </div>
    </div>
  );
};

export default Login_FormSection;
