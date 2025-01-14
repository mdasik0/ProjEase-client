import { Link } from "react-router-dom";
import Login_FormSection from "../../components/AuthLayout/Login/Login_FormSection";
import Login_imgSection from "../../components/AuthLayout/Login/Login_imgSection";
import miniLogo from '/logo/mini-logo/MINI_LOGO_FOR_WHITE_BG.png'
const Signin = () => {
  return (
    <div className="w-screen md:px-[5vw] md:py-[4vw] h-screen lg:bg-gray-300">
      <div className="bg-white lg:rounded-3xl lg:w-[1000px] mx-auto flex lg:flex-row flex-col justify-between items-center overflow-hidden">
    <Link title="go back to homepage" to={'/'}>
    <img className="h-12 w-12 absolute top-10 left-10" src={miniLogo} alt="mini-logo of projease, redirects to homepage" />
    </Link>
      <Login_FormSection />
      <Login_imgSection />
      </div>
    </div>
  );
};

export default Signin;
