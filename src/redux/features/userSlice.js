import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../../utils/firebase.config";

const initialState = {
  name: "",
  email: "",
  isLoading: false,
  isError: false,
  error: "",
};

// whatever user sends as a body in the hook recived as a obj in the payload,
// you can destructure it ({email, password}) or you can do this --
export const createUser = createAsyncThunk(
  "/userSlice/createUser",
  async (payload) => {
    const data = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    await updateProfile(auth.currentUser, { displayName: payload.name });

    return { name: data.user.displayName, email: data.user.email };
  }
);

export const loginUser = createAsyncThunk(
  "/userSlice/loginUser",
  async (payload) => {
    const data = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return { name: data.user.displayName, email: data.user.email };
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.name = "";
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.name = "";
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.name = "";
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.name = "";
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { resetUser, setUser, toggleLoading } = userSlice.actions;
export default userSlice.reducer;
