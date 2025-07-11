import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../core/slice/authSlice';
import userReducer from '../core/slice/userSlice';
import deliveryReducer from '../core/slice/deliverySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    deliveries: deliveryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
