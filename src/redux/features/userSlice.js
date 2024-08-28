import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../utils/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

// Enum-like constants for method types
const AUTH_METHODS = {
  SIGN_IN: "sign-in",
  GOOGLE: "google",
};

const initialState = {
  name: "",
  email: "",
  image: "",
  method: "",
  phoneNumber: "",
  lastUpdated: "",
  isLoading: false,
  isError: false,
  error: "",
};

// Sign up new user
export const signUpUser = createAsyncThunk(
  "userSlice/signUpUser",
  async (payload, { rejectWithValue }) => {
    try {
      // create a new user
      const data = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      // update the username
      await updateProfile(auth.currentUser, { displayName: payload.name });

      // storing information in the state
      return {
        name: data.user.displayName,
        email: data.user.email,
        image: data.user.photoURL || "",
        method: AUTH_METHODS.SIGN_IN,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Log in existing user
export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      localStorage.setItem('authMethod', 'sign-in');
      return {
        name: data.user.displayName || "",
        email: data.user.email,
        image: data.user.photoURL || "",
        method: AUTH_METHODS.SIGN_IN,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Log out user
export const logoutUser = createAsyncThunk(
  "/userSlice/logoutUser",
  async () => {
    await signOut(auth);
    localStorage.removeItem('authMethod');
    return { name: "", email: "", image: "", method: "" };
  }
);


// Log in with Google
export const googleLogin = createAsyncThunk(
  "userSlice/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);
      localStorage.setItem('authMethod', 'google');

      console.log(data)
      return {
        name: data.user.displayName || "",
        email: data.user.email,
        image: data.user.photoURL || "",
        method: AUTH_METHODS.GOOGLE,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.image = payload.image;
      state.method = payload.method;
      state.isLoading = false; 
    },
    resetUser: (state) => {  
      state.name = "";
      state.email = "";
      state.image = "";
      state.method = "";
      state.isLoading = false; 
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.image = action.payload.image;
        state.isLoading = false;
        state.method = action.payload.method;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.image = action.payload.image;
        state.isLoading = false;
        state.method = action.payload.method;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.image = action.payload.image;
        state.isLoading = false;
        state.method = action.payload.method;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      })

      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.image = action.payload.image;
        state.isLoading = false;
        state.method = action.payload.method;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetUser, setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import auth from "../../utils/firebase.config";
// import { GoogleAuthProvider } from "firebase/auth";

// const initialState = {
//   name: "",
//   email: "",
//   image: "",
//   method: "",
//   isLoading: false,
//   isError: false,
//   error: "",
// };

// // whatever user sends as a body in the hook recived as a obj in the payload,
// // you can destructure it ({email, password}) or you can do this --
// export const signUpUser = createAsyncThunk(
//   "/userSlice/signUpUser",
//   async (payload) => {
//     // creating a new user
//     const data = await createUserWithEmailAndPassword(
//       auth,
//       payload.email,
//       payload.password
//     );

//     // updating the new username
//     await updateProfile(auth.currentUser, { displayName: payload.name });
    
//     // storing the data in redux state
//     return { name: data.user.displayName, email: data.user.email, image : data.user.photoURL, method: "sign-in"};
//   }
// );

// export const loginUser = createAsyncThunk(
//   "/userSlice/loginUser",
//   async (payload) => {
//     const data = await signInWithEmailAndPassword(
//       auth,
//       payload.email,
//       payload.password
//     );
//     return { name: data.user.displayName, email: data.user.email, image: data.user.photoURL, method: "sign-in" };
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "/userSlice/logoutUser",
//   async () => {
//     await signOut(auth);
//     return { name: "", email: "", image: "", method: "" };
//   }
// );

// export const googleLogin = createAsyncThunk(
//   "/userSlice/googleLogin",
//   async () => {
//     const provider = new GoogleAuthProvider();
//     const data = await signInWithPopup(auth, provider);
//     return { name: data.user.displayName, email: data.user.email, image: data.user.photoURL, method: "google" };
//   }
// );

// const userSlice = createSlice({
//   name: "userSlice",
//   initialState,
//   reducers: {
//     setUser: (state, { payload }) => {
//       state.name = payload.name;
//       state.email = payload.email;
//     },
//     toggleLoading: (state, { payload }) => {
//       state.isLoading = payload;
//     },
//     resetUser: (state) => {
//       state.name = "";
//       state.email = "";
//       state.method = "";
//       state.image = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signUpUser.pending, (state) => {
//         state.name = "";
//         state.email = "";
//         state.isLoading = true;
//         state.isError = false;
//         state.error = "";
//         state.method = "";
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.name = action.payload.name;
//         state.email = action.payload.email;
//         state.isLoading = false;
//         state.isError = false;
//         state.error = "";
//         state.method = action.payload.method;
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.name = "";
//         state.email = "";
//         state.isLoading = false;
//         state.isError = true;
//         state.error = action.error.message;
//         state.method = "";
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.name = "";
//         state.email = "";
//         state.isLoading = true;
//         state.isError = false;
//         state.error = "";
//         state.method = "";
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.name = action.payload.name;
//         state.email = action.payload.email;
//         state.isLoading = false;
//         state.isError = false;
//         state.error = "";
//         state.method = action.payload.method;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.name = "";
//         state.email = "";
//         state.isLoading = false;
//         state.isError = true;
//         state.error = action.error.message;
//         state.method = "";
//       })
//       .addCase(logoutUser.fulfilled, (state, action) => {
//         state.name = action.payload.name;
//         state.email = action.payload.email;
//         state.isLoading = false;
//         state.isError = false;
//         state.error = "";
//         state.image = action.payload.image
//         state.method = action.payload.method;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.name = "";
//         state.email = "";
//         state.isLoading = false;
//         state.isError = true;
//         state.error = action.error.message;
//         state.method = "";
//       })
//       .addCase(googleLogin.fulfilled, (state, action) => {
//         state.name = action.payload.name;
//         state.email = action.payload.email;
//         state.image = action.payload.image;
//         state.isLoading = false;
//         state.isError = false;
//         state.error = "";
//         state.method = action.payload.method;
//       })
//       .addCase(googleLogin.rejected, (state, action) => {
//         state.name = "";
//         state.email = "";
//         state.image = "";
//         state.isLoading = false;
//         state.isError = true;
//         state.error = action.error.message;
//         state.method = "";
//       });
//   },
// });

// export const { resetUser, setUser, toggleLoading } = userSlice.actions;
// export default userSlice.reducer;
