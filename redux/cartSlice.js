import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      if (state[id]) {
        state[id].quantity += 1;
      } else {
        state[id] = { ...action.payload, quantity: 1 };
      }
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      if (state[id]) {
        state[id].quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      if (state[id] && state[id].quantity > 0) {
        state[id].quantity -= 1;
      }
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;