import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import templateReducer from './slices/templateSlice';

export const store = configureStore({
  reducer: {
    profiles: profileReducer,
    templates: templateReducer,
  },
});
