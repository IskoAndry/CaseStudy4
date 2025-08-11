import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBooks, fetchBookById } from '../../api/booksApi';

export const getBooks = createAsyncThunk(
  'books/getBooks',
  async (filters, thunkAPI) => {
    try {
      const books = await fetchBooks(filters);
      return books;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default booksSlice.reducer;