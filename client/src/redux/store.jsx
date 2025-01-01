import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { productsReducer, productDetailsReducer } from './productSlice';
import cartReducer from './cartSlice'; // Import the cart reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer, // Add the cart reducer here
  },
});

export default store;
