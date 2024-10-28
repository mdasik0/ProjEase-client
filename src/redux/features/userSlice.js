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

const initialState = {
  userData: {},
  email: "",
  login_method: '',
  isLoading: false,
  socialLoginLoading:false,
  isError: false,
  error: "",
};

export const uploadImageToImgbb = createAsyncThunk(
  'userSlice/imgbbHosting',
  async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const imgbbApiKey = import.meta.env.VITE_IMGBB_apiKey
    console.log(imgbbApiKey)
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.data.url; // Return the image URL
  }
);

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

      return {
        email: data.user.email,
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
      return {
        email: data.user.email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFirebaseUser = createAsyncThunk(
  "userSlice/updateFirebaseUser",
  async (payload, { rejectWithValue }) => {
    try {
      const updateData = {};
      if (payload.name) updateData.displayName = payload.name;
      if (payload.image) updateData.photoURL = payload.image;

      await updateProfile(auth.currentUser, updateData);
      return updateData;
    } catch (error) {
      return rejectWithValue(error.message || "Error updating user");
    }
  }
);

// Log out user
export const logoutUser = createAsyncThunk(
  "/userSlice/logoutUser",
  async () => {
    await signOut(auth);
    return { email: "", userData: {} };
  }
);

// Log in with Google
export const googleLogin = createAsyncThunk(
  "userSlice/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);
      console.log(data);
      return {
        email: data.user.email,
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
      state.email = payload.email;
      state.isLoading = false;
      state.userData = payload.userData
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
        state.email = action.payload.email;
        state.login_method = 'email'
        state.isLoading = false;
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
        state.email = action.payload.email;
        state.login_method = 'email';
        state.isLoading = false;
        state.method = action.payload.method;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      })

      // Logout
      .addCase(logoutUser.pending,(state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.email = '';
        state.login_method= '';
        state.userData = {}
        state.isLoading = false;
      })

      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.socialLoginLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.login_method = 'google';
        state.socialLoginLoading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.socialLoginLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      })

      .addCase(updateFirebaseUser.pending, (state) => {
        state.updateUserStatus = "loading";
        state.isError = false;
        state.error = "";
      })
      .addCase(updateFirebaseUser.fulfilled, (state, action) => {
        state.name = action.payload.displayName || state.name;
        state.image = action.payload.photoURL || state.image;
        state.updateUserStatus = "succeeded";
        state.lastUpdated = new Date().toISOString();
        state.isLoading = false;
      })
      .addCase(updateFirebaseUser.rejected, (state, action) => {
        state.updateUserStatus = "failed";
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
