import Login_FormSection from "../../components/AuthLayout/Login/Login_FormSection";
import Login_imgSection from "../../components/AuthLayout/Login/Login_imgSection";
const Signin = () => {
  return (
    <div className="w-screen px-[5vw] py-[4vw] h-screen bg-gray-300">
      <div className="bg-white rounded-3xl w-[1000px] mx-auto flex justify-between items-center overflow-hidden">

      <Login_FormSection />
      <Login_imgSection />
      </div>
    </div>
  );
};

export default Signin;
