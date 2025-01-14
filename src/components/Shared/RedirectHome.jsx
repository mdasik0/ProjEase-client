import miniLogo from '/logo/mini-logo/MINI_LOGO_FOR_WHITE_BG.png'
import { Link } from "react-router-dom";

const RedirectHome = () => {
    return (
        <Link title="go back to homepage" to={'/'}>
    <img className="h-12 w-12 absolute top-10 left-10" src={miniLogo} alt="mini-logo of projease, redirects to homepage" />
    </Link>
    );
};

export default RedirectHome;