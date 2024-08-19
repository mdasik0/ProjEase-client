import { getAuth, onAuthStateChanged } from "firebase/auth";
import { resetUser, setUser, setLoading } from "./features/userSlice";

export const listenForAuthChanges = (dispatch) => {
  const auth = getAuth();

  // Set loading to true when starting to listen for auth changes
  dispatch(setLoading(true));

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const { displayName, email, photoURL } = user;
      const method = localStorage.getItem('authMethod') || "auth-state-change";
      dispatch(setUser({
        name: displayName || "",
        email: email || "",
        image: photoURL || "",
        method: method,
      }));
    } else {
      // User is signed out
      localStorage.removeItem('authMethod');
      dispatch(resetUser());
    }
    // Stop loading after auth state is determined
    dispatch(setLoading(false));
  });

  // Clean up the listener when the component unmounts
  return () => unsubscribe();
};
