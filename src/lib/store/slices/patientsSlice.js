import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  mockGetPatients,
  mockAddPatient,
  mockUpdatePatient,
  mockDeletePatient,
} from '@/lib/api/mockApi';

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async (params = {}) => {
  const response = await mockGetPatients(params);
  return response;
});

export const addPatient = createAsyncThunk('patients/addPatient', async (patientData) => {
  const response = await mockAddPatient(patientData);
  return response;
});

export const updatePatient = createAsyncThunk('patients/updatePatient', async ({ id, updates }) => {
  const response = await mockUpdatePatient(id, updates);
  return response;
});

export const deletePatient = createAsyncThunk('patients/deletePatient', async (id) => {
  await mockDeletePatient(id);
  return id;
});

const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPatients
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload.data || action.payload;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addPatient
      .addCase(addPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients.push(action.payload);
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // updatePatient
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.patients.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // deletePatient
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearError, setPage } = patientsSlice.actions;
export default patientsSlice.reducer;