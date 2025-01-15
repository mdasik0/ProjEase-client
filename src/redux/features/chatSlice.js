import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatInfo: {},
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setChatInfo: (state, { payload }) => {
      state.chatInfo = payload;
    },
  },
});

export const {setChatInfo} = chatSlice.actions;

export default chatSlice.reducer;
