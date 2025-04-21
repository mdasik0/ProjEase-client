import { logoutUser } from "../redux/features/userSlice";
import { resetProjSlice } from "../redux/features/projectSlice";
import { resetTaskSlice } from "../redux/features/tasksSlice";
import toast from "react-hot-toast";
// for non react components and 

const useLogout = async (dispatch) => {
    localStorage.removeItem("authToken");

    try {
       await fetch("http://localhost:5000/remove-refresh-token", {
        method: "DELETE",
      })
    } catch (error) {
      console.error("Failed to remove refresh token:", error);
    }
    dispatch(logoutUser());
    dispatch(resetProjSlice());
    dispatch(resetTaskSlice());
    toast.success("User logged out successfully");
}

export default useLogout;