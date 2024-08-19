import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeChange } from "../../redux/features/otherSlice";
import { Toaster } from "react-hot-toast";
import { listenForAuthChanges } from "../../redux/auth_listener";

const App = ({ children }) => {
  const { themes } = useSelector((state) => state.otherSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light";
    dispatch(themeChange(storedTheme));
  }, [dispatch]);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", themes);
  }, [themes]);

  useEffect(() => {
    // Start listening for auth changes when the app mounts
    listenForAuthChanges(dispatch);
  }, [dispatch]);

  return (
    <div className="h-screen w-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
