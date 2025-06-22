import { getAuth, onAuthStateChanged } from "firebase/auth";
import { resetUser, setUser, setLoading } from "./features/userSlice";
import logOut from "../utils/generalLogOut";

export const listenForAuthChanges = (dispatch) => {
  const auth = getAuth();
  dispatch(setLoading(true));

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      let token = localStorage.getItem("authToken");

      if (!token) {
        console.warn("Token missing, exiting auth listener.");
        dispatch(setLoading(false));
        return;
      }

      const { email } = user;
      dispatch(setUser({ email: email || "" }));

      try {
        let response = await fetchUserData(email, token);

        // If token expired, try refreshing
        if (!response.ok) {
          const errorData = await response.json();

          if (errorData.error === "Invalid or expired token.") {
            const newToken = await refreshAccessToken();

            if (newToken) {
              localStorage.setItem("authToken", newToken);
              // Retry with new token
              response = await fetchUserData(email, newToken);
            } else {
              logOut(dispatch);
              return;
            }
          }
        }

        if (response.ok) {
          const userData = await response.json();
          dispatch(setUser({ email, userData }));

          //redirect users without name or image
          isProfileIncomplete(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Auth error:", err.message);
      }
    } else {
      dispatch(resetUser());
    }

    dispatch(setLoading(false));
  });

  return () => unsubscribe();
};

// Helper functions just fetches user data.
const fetchUserData = async (email, token) => {
  return fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/getUser/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//func to redirect users without name
const isProfileIncomplete = (user) => {
  const doesNameExist = user?.name;
  if (!doesNameExist) {
    if(window.location.pathname !== '/auth/enter-your-name') {
      return window.location.href = '/auth/enter-your-name'
    }
  } else {
    return
  }
};

// gets new access token if old one expires
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_BASEURL
      }/refresh-token?refresh=${refreshToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};
