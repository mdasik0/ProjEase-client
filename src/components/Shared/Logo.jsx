import { useSelector } from "react-redux";
import darkModeLogo from "/logo/logo-black.png"
import lightModeLogo from "../../../public/logo/svg-projease-logo.svg"
const Logo = () => {
    const {themes} = useSelector((state) => state.otherSlice)

    return (
        <figure>
           <img className="h-8" src={ themes === "light"
        ? lightModeLogo
        : darkModeLogo} alt="logo" /> 
        </figure>
    );
};

export default Logo;