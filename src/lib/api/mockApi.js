// Mock API functions to simulate backend
const mockUsers = [
  {
    id: 1,
    email: 'receptionist@hospital.com',
    password: 'password123',
    name: 'Sarah Johnson',
    role: 'RECEPTIONIST',
  },
  {
    id: 2,
    email: 'doctor@hospital.com',
    password: 'password123',
    name: 'Dr. Michael Chen',
    role: 'DOCTOR',
  },
];

// Make sure these arrays are properly mutable
let mockPatients = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '1234 5678 90',
    dateOfBirth: '1985-03-15',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Smith - 1234 5678 90',
    bloodType: 'O+',
    allergies: 'Penicillin',
  },
  {
    id: 2,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '2345-6789-10',
    dateOfBirth: '1992-07-22',
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: 'Robert Davis - 2345-6789-10',
    bloodType: 'A+',
    allergies: 'None',
  },
];

let mockDoctors = [
  {
    id: 1,
    name: 'Dr. Michael Chen',
    specialization: 'Cardiology',
    email: 'm.chen@hospital.com',
    phone: '(555) 345-6789',
    experience: '15 years',
    education: 'MD from Harvard Medical School',
  },
  {
    id: 2,
    name: 'Dr. Sarah Wilson',
    specialization: 'Pediatrics',
    email: 's.wilson@hospital.com',
    phone: '4456-7890-89',
    experience: '12 years',
    education: 'MD from Johns Hopkins',
  },
  {
    id: 3,
    name: 'Dr. Robert Martinez',
    specialization: 'Orthopedics',
    email: 'r.martinez@hospital.com',
    phone: '5567-8901-29',
    experience: '18 years',
    education: 'MD from Stanford Medical School',
  },
  {
    id: 4,
    name: 'Dr. Emily Rodriguez',
    specialization: 'Neurology',
    email: 'e.rodriguez@hospital.com',
    phone: '678-9012-31',
    experience: '10 years',
    education: 'MD from UCLA Medical School',
  },
];

let mockAppointments = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    patientName: 'John Smith',
    doctorName: 'Dr. Michael Chen',
    date: new Date().toISOString().split('T')[0], // Today's date
    time: '10:00',
    status: 'scheduled',
    reason: 'Regular checkup',
    notes: 'Patient reports feeling well',
  },
  {
    id: 2,
    patientId: 2,
    doctorId: 2,
    patientName: 'Emily Davis',
    doctorName: 'Dr. Sarah Wilson',
    date: new Date().toISOString().split('T')[0], // Today's date
    time: '14:30',
    status: 'scheduled',
    reason: 'Annual physical',
    notes: '',
  },
];

export const mockLogin = async ({ email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = mockUsers.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  return {
    accessToken: 'mock-jwt-token',
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  };
};

export const mockGetPatients = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...mockPatients]; // Return a new array copy
};

export const mockAddPatient = async (patientData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newPatient = {
    ...patientData,
    id: Date.now(),
  };
  mockPatients = [...mockPatients, newPatient]; // Create new array
  return newPatient;
};

export const mockGetDoctors = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...mockDoctors];
};

export const mockGetDoctorsBySpecialization = async (specialization) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockDoctors.filter((doctor) => doctor.specialization === specialization);
};

export const mockGetAppointments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...mockAppointments];
};

export const mockGetDoctorAppointments = async (doctorId, date) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockAppointments.filter((apt) => apt.doctorId === parseInt(doctorId) && apt.date === date);
};

export const mockAddAppointment = async (appointmentData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newAppointment = {
    ...appointmentData,
    id: Date.now(),
  };
  mockAppointments = [...mockAppointments, newAppointment];
  return newAppointment;
};

export const mockUpdateAppointment = async (id, updates) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockAppointments.findIndex((apt) => apt.id === parseInt(id));
  if (index !== -1) {
    mockAppointments[index] = { ...mockAppointments[index], ...updates };
    return mockAppointments[index];
  }
  throw new Error('Appointment not found');
};

export const mockUpdatePatient = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockPatients.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    throw new Error('Patient not found');
  }
  mockPatients[index] = { ...mockPatients[index], ...updates };
  return mockPatients[index];
};

export const mockDeletePatient = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockPatients.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    throw new Error('Patient not found');
  }
  mockPatients.splice(index, 1);
  return { id };
};