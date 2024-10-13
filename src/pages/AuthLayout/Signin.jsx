import Login_FormSection from "../../components/AuthLayout/Login/Login_FormSection";
import Login_imgSection from "../../components/AuthLayout/Login/Login_imgSection";
const Signin = () => {
  return (
    <div className="w-screen md:px-[5vw] md:py-[4vw] h-screen lg:bg-gray-300">
      <div className="bg-white lg:rounded-3xl lg:w-[1000px] mx-auto flex lg:flex-row flex-col justify-between items-center overflow-hidden">

      <Login_FormSection />
      <Login_imgSection />
      </div>
    </div>
  );
};

export default Signin;
