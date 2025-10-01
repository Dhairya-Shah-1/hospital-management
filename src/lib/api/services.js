import apiClient from './axios';

// Authentication
export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
};

// Patients
export const patientsApi = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/patients', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  },
  create: async (patientData) => {
    const response = await apiClient.post('/patients', patientData);
    return response.data;
  },
  update: async (id, patientData) => {
    const response = await apiClient.put(`/patients/${id}`, patientData);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/patients/${id}`);
    return response.data;
  },
};

// Doctors
export const doctorsApi = {
  getAll: async () => {
    const response = await apiClient.get('/doctors');
    return response.data;
  },
  getBySpecialization: async (specialization) => {
    const response = await apiClient.get(`/doctors/specialization/${specialization}`);
    return response.data;
  },
};

// Appointments
export const appointmentsApi = {
  getAll: async () => {
    const response = await apiClient.get('/appointments');
    return response.data;
  },
  getByDoctor: async (doctorId, date) => {
    const response = await apiClient.get(`/appointments/doctor/${doctorId}`, {
      params: { date },
    });
    return response.data;
  },
  create: async (appointmentData) => {
    const response = await apiClient.post('/appointments', appointmentData);
    return response.data;
  },
  update: async (id, updates) => {
    const response = await apiClient.patch(`/appointments/${id}`, updates);
    return response.data;
  },
};