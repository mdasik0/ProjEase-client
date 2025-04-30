import { getAuth, onAuthStateChanged } from "firebase/auth";
import { resetUser, setUser, setLoading } from "./features/userSlice";
import logOut from "../utils/generalLogOut";

export const listenForAuthChanges = (dispatch) => {
  const auth = getAuth();

  dispatch(setLoading(true));

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      // 🔒 Wait until token is truly available
      let token = localStorage.getItem("authToken");
  
      // ⏳ Wait until token is set (max 10 tries, 50ms delay)
      let retries = 0;
      while (!token && retries < 10) {
        await new Promise((res) => setTimeout(res, 50));
        token = localStorage.getItem("authToken");
        retries++;
      }
  
      if (!token) {
        console.warn("Token still missing after wait, exiting auth listener.");
        return;
      }
  
      const { email } = user;
      dispatch(setUser({ email: email || "" }));
      dispatch(setLoading(true));
  
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/getUser/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorInfo = await response.json();
          if (errorInfo.error === "Invalid or expired token.") {
            
            const res = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/refresh-token`, {
              method: "POST",
              credentials: "include",
            });
            const newAccessToken = await res.json();
            if (newAccessToken) {
              localStorage.setItem("authToken", newAccessToken.accessToken);
            } else {
              logOut(dispatch);
              return;
            }
          }
        }
  
        const data = await response.json();
        if (data) {
          dispatch(setUser({ email, userData: data }));
        }
      } catch (err) {
        console.error("There was an error fetching the user:", err.message);
      }
    } else {
      dispatch(resetUser());
    }
  
    dispatch(setLoading(false));
  });
  

  // Clean up the listener when the component unmounts
  return () => unsubscribe();
};
