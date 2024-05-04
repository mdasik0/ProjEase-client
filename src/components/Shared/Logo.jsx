import { useSelector } from "react-redux";
import darkModeLogo from "/logo/logo-black.png"
import lightModeLogo from "/logo/logo-white.png"
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