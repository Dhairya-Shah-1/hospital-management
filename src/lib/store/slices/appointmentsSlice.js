'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  mockGetAppointments,
  mockAddAppointment,
  mockUpdateAppointment,
  mockGetDoctorAppointments,
} from '@/lib/api/mockApi';

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
  const response = await mockGetAppointments();
  return response;
});

export const fetchDoctorAppointments = createAsyncThunk(
  'appointments/fetchDoctorAppointments',
  async ({ doctorId, date }) => {
    const response = await mockGetDoctorAppointments(doctorId, date);
    return response;
  }
);

export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async (appointmentData) => {
    const response = await mockAddAppointment(appointmentData);
    return response;
  }
);

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ id, updates }) => {
    const response = await mockUpdateAppointment(id, updates);
    return response;
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    doctorAppointments: [],
    loading: false,
    error: null,
    selectedDate: new Date().toISOString().split('T')[0], // Fixed: Get only date part
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorAppointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex((apt) => apt.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedDate, clearError } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;