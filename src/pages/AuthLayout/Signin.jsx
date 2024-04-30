import Login_FormSection from "../../components/AuthLayout/Login/Login_FormSection";
import Login_imgSection from "../../components/AuthLayout/Login/Login_imgSection";
const Signin = () => {
  
  return (
    <div className="flex h-screen justify-between items-center">
      
      <Login_FormSection />
      <Login_imgSection />
    </div>
  );
};

export default Signin;
