import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockGetDoctors, mockGetDoctorsBySpecialization } from '@/lib/api/mockApi';

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await mockGetDoctors();
  return response;
});

export const fetchDoctorsBySpecialization = createAsyncThunk(
  'doctors/fetchDoctorsBySpecialization',
  async (specialization) => {
    const response = await mockGetDoctorsBySpecialization(specialization);
    return response;
  }
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    filteredDoctors: [],
    loading: false,
    error: null,
    selectedSpecialization: 'all',
  },
  reducers: {
    setSelectedSpecialization: (state, action) => {
      state.selectedSpecialization = action.payload;
      if (action.payload === 'all') {
        state.filteredDoctors = state.doctors;
      } else {
        state.filteredDoctors = state.doctors.filter(
          (doctor) => doctor.specialization === action.payload
        );
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
        state.filteredDoctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDoctorsBySpecialization.fulfilled, (state, action) => {
        state.filteredDoctors = action.payload;
      });
  },
});

export const { setSelectedSpecialization, clearError } = doctorsSlice.actions;
export default doctorsSlice.reducer;