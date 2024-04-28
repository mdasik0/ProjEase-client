import { configureStore } from '@reduxjs/toolkit'
import otherSlice from './features/otherSlice'
import userSlice from './features/userSlice'

const store = configureStore({
  reducer: {
    // [userApi.reducerPath]: userApi.reducer,
    otherSlice: otherSlice,
    userSlice: userSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(userApi.middleware),
})

export default store