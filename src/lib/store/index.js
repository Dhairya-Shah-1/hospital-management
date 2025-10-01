import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import patientsSlice from './slices/patientsSlice';
import doctorsSlice from './slices/doctorsSlice';
import appointmentsSlice from './slices/appointmentsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    patients: patientsSlice,
    doctors: doctorsSlice,
    appointments: appointmentsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;