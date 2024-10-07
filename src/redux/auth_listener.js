import { getAuth, onAuthStateChanged } from "firebase/auth";
import { resetUser, setUser, setLoading } from "./features/userSlice";

export const listenForAuthChanges = (dispatch) => {
  const auth = getAuth();

  // Set loading to true when starting to listen for auth changes
  dispatch(setLoading(true));

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const { email } = user;
      dispatch(setUser({
        email: email || "",
      }));
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
