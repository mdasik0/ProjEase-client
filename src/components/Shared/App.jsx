import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeChange } from "../../redux/features/otherSlice";

const App = ({ children }) => {
  const { themes } = useSelector((state) => state.otherSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedMode = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light";
    dispatch(themeChange(storedMode));
  }, [dispatch]);

  return (
    <div
      data-theme={themes === "light" ? "light" : "dark"}
      className={`h-screen w-screen `}
    >
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
