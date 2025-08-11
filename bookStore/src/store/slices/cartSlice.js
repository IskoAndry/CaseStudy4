import { createSlice } from '@reduxjs/toolkit';

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.finalPrice, 0);
};

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id && item.isRent === action.payload.isRent
      );

      if (existingItem) {
        // Обновляем период аренды если книга уже в корзине
        if (action.payload.isRent) {
          existingItem.rentPeriod = action.payload.rentPeriod;
          existingItem.finalPrice = action.payload.finalPrice;
        }
      } else {
        state.items.push(action.payload);
      }

      state.total = calculateTotal(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.total = calculateTotal(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },

    updateRentPeriod: (state, action) => {
      const { id, period } = action.payload;
      const item = state.items.find((item) => item._id === id && item.isRent);
      
      if (item) {
        item.rentPeriod = period;
        // Пересчет цены аренды
        const rentPrices = {
          '2 weeks': item.rentPrice * 1,
          '1 month': item.rentPrice * 2,
          '3 months': item.rentPrice * 4,
        };
        item.finalPrice = rentPrices[period] || 0;
        state.total = calculateTotal(state.items);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateRentPeriod } = cartSlice.actions;

// Селекторы
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => state.cart.items.length;

export default cartSlice.reducer;