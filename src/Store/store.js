import cartSlice from "./Slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    cartSlice,
  },
});
