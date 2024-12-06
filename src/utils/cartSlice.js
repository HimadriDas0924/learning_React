import { createSlice } from "@reduxjs/toolkit";

// createSlice fn: comes from rtk

// this fn requires a configuration object => name of slice, initial state (i.e initial data of the slice), reducers (reducer functions)

// reducers => all the reducer functions.

// actions could be => adding an item, removing an item, clear the cart => so they're like apis to communicate with the store.

/*
    - createSlice() fn returns an object which looks like:
    - {
        actions: {
          addItems
        },
        reducer
      }
*/
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // mutating the state => i.e directly modifying the state that we get from paramters.
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop(); // later write the correct logic here
    },
    clearCart: (state) => {
      state.items.length = 0; // []: bcz all elements are cleared from the memory
      // BUT, why not do this: state.items : []
    },
  },
});

// export both the actions, reducers of the cartSlice

export const { addItem, removeItem, clearCart } = cartSlice.actions; // all actions are named exported

export default cartSlice.reducer; // reducer default exported
