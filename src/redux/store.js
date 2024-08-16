import { configureStore } from "@reduxjs/toolkit";
import otherSlice from "./features/otherSlice";
import userSlice from "./features/userSlice";
import tasksSlice from "./features/tasksSlice";
import tasksApi from "./api/tasksApi";
import userApi from "./api/userApi";

const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    otherSlice: otherSlice,
    tasksSlice: tasksSlice,
    userSlice: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tasksApi.middleware)
      .concat(userApi.middleware),
});

export default store;
