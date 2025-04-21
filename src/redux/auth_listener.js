import { getAuth, onAuthStateChanged } from "firebase/auth";
import { resetUser, setUser, setLoading } from "./features/userSlice";
import useLogout from "../hooks/useLogout";

export const listenForAuthChanges = (dispatch) => {
  const auth = getAuth();

  // Set loading to true when starting to listen for auth changes
  dispatch(setLoading(true));

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const { email } = user;
      dispatch(
        setUser({
          email: email || "",
        })
      );

      const token = localStorage.getItem("authToken");
      dispatch(setLoading(true));
      try {
        const response = await fetch(`http://localhost:5000/getUser/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          //IF jwt token expired or invalid, asks for refresh token
          const errorInfo = await response.json();
          if (errorInfo.error === "Invalid or expired token.") {
            const res = await fetch("http://localhost:5000/refresh-token", {
              method: "POST",
              credentials: "include",
            });
            const newAccessToken = await res.json();
            if (newAccessToken) {
              localStorage.setItem("authToken", newAccessToken.accessToken);
            } else {
              useLogout(dispatch);
            }
          }
        }
        const data = await response.json();

        if (data) {
          dispatch(setUser({ email: email, userData: data }));
          dispatch(setLoading(false));
        }
      } catch (err) {
        console.error("There was an Error Fetching the user:", err.message);
        dispatch(setLoading(false));
      }
    } else {
      // User is signed out
      dispatch(resetUser());
    }
    // Stop loading after auth state is determined
    dispatch(setLoading(false));
  });

  // Clean up the listener when the component unmounts
  return () => unsubscribe();
};
