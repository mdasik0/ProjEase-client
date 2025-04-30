// a logout function for react and non react components

import toast from "react-hot-toast";
import { resetProjSlice } from "../redux/features/projectSlice";
import { resetTaskSlice } from "../redux/features/tasksSlice";
import { logoutUser } from "../redux/features/userSlice";

const logOut = async (dispatch) => {
    localStorage.removeItem("authToken");
    try {
        await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/remove-refresh-token`, {
            method: "DELETE",
        });
    }
    catch (error) {
        console.error("Failed to remove refresh token:", error);
    }
    dispatch(logoutUser());
    dispatch(resetProjSlice());
    dispatch(resetTaskSlice());
    toast.success("User logged out successfully");
}

export default logOut;