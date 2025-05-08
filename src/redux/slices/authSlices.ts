import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  uid: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthorized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthorized = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthorized = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAuth = () => useSelector((state: RootState) => state.auth);