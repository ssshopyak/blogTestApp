import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlices';
import postsReducer from '../slices/postsSlices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;