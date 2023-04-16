import { register, login, logout } from './auth-operation';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  isAuth: false,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.isLoading = false;
        state.user.name = null;
        state.user.email = null;
        state.token = null;
        state.isAuth = false;
        state.error = null;
      })
      .addMatcher(
        action =>
          action.type.startsWith('auth') && action.type.endsWith('/panding'),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('auth') && action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.auth.isLoading = false;
          state.auth.error = payload;
        }
      );
  },
});

// export const { logout } = authSlice.actions;
export default authSlice.reducer;
