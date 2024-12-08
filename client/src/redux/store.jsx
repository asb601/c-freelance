import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { productsReducer, productDetailsReducer } from "./productSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
