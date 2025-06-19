// a logout function for react and non react components

import toast from "react-hot-toast";
import { resetProjSlice } from "../redux/features/projectSlice";
import { resetTaskSlice } from "../redux/features/tasksSlice";
import { logoutUser } from "../redux/features/userSlice";

const logOut = async (dispatch) => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken")
    dispatch(logoutUser());
    dispatch(resetProjSlice());
    dispatch(resetTaskSlice());
    toast.success("User logged out successfully");
}

export default logOut;