import Register_FormSection from "../../components/AuthLayout/Register/Register_FormSection";
import Register_imgSection from "../../components/AuthLayout/Register/Register_imgSection";
import RedirectHome from "../../components/Shared/RedirectHome";

const Signup = () => {
  return (
    <div className="w-screen md:px-[5vw] md:py-[4vw] h-screen lg:bg-gray-300">
      <div className="bg-white lg:rounded-3xl lg:w-[1000px] mx-auto flex lg:flex-row-reverse flex-col justify-between items-center overflow-hidden">
        <RedirectHome />
        <Register_FormSection />
        <Register_imgSection />
      </div>
    </div>
  );
};

export default Signup;
