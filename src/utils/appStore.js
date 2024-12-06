import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

/* NOTE:
    - just like slice, to modify a store: we need a reducer.
    - and within this reducer, we'll mention individual reducers which we're exporting from each slice.
*/
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;
