import { configureStore } from '@reduxjs/toolkit'
import otherSlice from './features/otherSlice'

const store = configureStore({
  reducer: {
    otherSlice: otherSlice
  },
})

export default store