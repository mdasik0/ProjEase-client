import { getAuth, onAuthStateChanged } from "firebase/auth";
import { resetUser, setUser, setLoading } from "./features/userSlice";
import { useGetUserQuery } from "./api/userApi";

export const listenForAuthChanges = (dispatch) => {
  const auth = getAuth();

  // Set loading to true when starting to listen for auth changes
  dispatch(setLoading(true));

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const { email } = user;
      dispatch(setUser({
        email: email || "",
      }));

      try {
        const {data ,error} = await dispatch(useGetUserQuery(email)).unwrap();
        if(data){
          dispatch(setUser({email: email, userData : data}))
        } else if(error) {
          console.error('Failed to fetch user data :', error);
        }
      } catch (err) {
        console.error('Error fetching user data :', err)
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
