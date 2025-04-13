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
  name: "",
  login_method: '',
  isLoading: false,
  socialLoginLoading:false,
  isError: false,
  error: "",
  idToken: "",
};

export const uploadImageToImgbb = createAsyncThunk(
  'userSlice/imgbbHosting',
  async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const imgbbApiKey = import.meta.env.VITE_IMGBB_apiKey
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
      const result = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      const user = result.user;
      const idToken = await user.getIdToken();

      return {
        email: user.email,
        idToken,
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
      const result = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      const user = result.user;
      const idToken = await user.getIdToken();
      return {
        email: user.email,
        idToken
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
    return { email: "", userData: {}, idToken: "" };
  }
);

// Log in with Google
export const googleLogin = createAsyncThunk(
  "userSlice/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      return {
        email: user.email,
        name: user.displayName,
        idToken,
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
      state.idToken= "";
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    refetchUpdate: (state, {payload}) => {
      state.userData = payload
    }
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
        state.idToken = action.payload.idToken;
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

export const { resetUser, setUser, setLoading, refetchUpdate } = userSlice.actions;
export default userSlice.reducer;