import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});