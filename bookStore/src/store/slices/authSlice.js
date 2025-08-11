import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuthHeader, clearAuthHeader } from '../../utils/auth';

const API_URL = 'http://localhost:5000/api/auth';

// Асинхронные действия
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, name, isLogin }, { rejectWithValue }) => {
    try {
      const url = isLogin ? `${API_URL}/login` : `${API_URL}/register`;
      const response = await axios.post(url, { email, password, name });
      
      if (response.data.token) {
        setAuthHeader(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка аутентификации');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    clearAuthHeader();
    localStorage.removeItem('user');
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

// Селекторы
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => !!state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;