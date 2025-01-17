import { configureStore } from "@reduxjs/toolkit";
import otherSlice from "./features/otherSlice";
import userSlice from "./features/userSlice";
import tasksSlice from "./features/tasksSlice";
import projectSlice from "./features/projectSlice";
import tasksApi from "./api/tasksApi";
import userApi from "./api/userApi";
import projectsApi from "./api/projectsApi";

const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    otherSlice: otherSlice,
    tasksSlice: tasksSlice,
    userSlice: userSlice,
    projectSlice: projectSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tasksApi.middleware)
      .concat(userApi.middleware)
      .concat(projectsApi.middleware),
});

export default store;
