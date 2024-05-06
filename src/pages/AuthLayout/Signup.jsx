

import Register_FormSection from "../../components/AuthLayout/Register/Register_FormSection";
import Register_imgSection from "../../components/AuthLayout/Register/Register_imgSection";
const Signup = () => {
  return (
    <div className="flex h-screen justify-between items-center ">
      <Register_FormSection />
      <Register_imgSection />
    </div>
  );
};

export default Signup;
