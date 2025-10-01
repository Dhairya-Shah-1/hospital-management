'use client';
import { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add,
  Person,
  Phone,
  Email,
  LocalHospital,
  Edit,
  Delete,
  Close,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import {
  fetchPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from '@/lib/store/slices/patientsSlice';
import {
  fetchAppointments,
  updateAppointment,
} from '@/lib/store/slices/appointmentsSlice';

const PatientForm = dynamic(() => import('@/components/forms/PatientForm'), {
  loading: () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <CircularProgress />
    </Box>
  ),
  ssr: false,
});

function PatientCard({ patient, onEdit, onDelete, userRole }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Person sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" gutterBottom>
            {patient.name}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography
            variant="body2"
            color="textSecondary"
            display="flex"
            alignItems="center"
            mb={1}
          >
            <Email sx={{ mr: 1, fontSize: 16 }} /> {patient.email}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            display="flex"
            alignItems="center"
            mb={1}
          >
            <Phone sx={{ mr: 1, fontSize: 16 }} /> {patient.phone}
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={1}>
            <strong>DOB:</strong> {patient.dateOfBirth}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={1} flexWrap="wrap">
            {patient.bloodType && (
              <Chip
                label={`Blood: ${patient.bloodType}`}
                size="small"
                color="primary"
                icon={<LocalHospital />}
              />
            )}
            {patient.allergies && patient.allergies !== 'None' && (
              <Chip
                label={`Allergies: ${patient.allergies}`}
                size="small"
                color="warning"
              />
            )}
          </Box>

          {userRole === 'RECEPTIONIST' && (
            <Box>
              <IconButton
                size="small"
                onClick={() => onEdit(patient)}
                color="primary"
              >
                <Edit />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDelete(patient.id)}
                color="error"
              >
                <Delete />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function PatientsPage() {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector((state) => state.patients);
  const { appointments } = useSelector((state) => state.appointments);
  const { isReceptionist } = useAuth();

  const [open, setOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleAddPatient = async (patientData) => {
    try {
      await dispatch(addPatient(patientData)).unwrap();
      setOpen(false);
      setEditingPatient(null);
    } catch (err) {
      console.error('Failed to add patient:', err);
    }
  };

  const handleEditPatient = async (patientData) => {
    try {
      await dispatch(
        updatePatient({ id: editingPatient.id, updates: patientData })
      ).unwrap();
      setOpen(false);
      setEditingPatient(null);
    } catch (err) {
      console.error('Failed to update patient:', err);
    }
  };

  const handleDeletePatient = async (patientId) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this patient and cancel their appointments?'
      )
    )
      return;
    try {
      await dispatch(deletePatient(patientId)).unwrap();
      const toCancel = appointments.filter((apt) => apt.patientId === patientId);
      await Promise.all(
        toCancel.map((apt) =>
          dispatch(
            updateAppointment({ id: apt.id, updates: { status: 'cancelled' } })
          ).unwrap()
        )
      );
    } catch (err) {
      console.error('Failed to delete patient or cancel appointments:', err);
    }
  };

  const handleEditClick = (patient) => {
    setEditingPatient(patient);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setEditingPatient(null);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      patient.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      patient.phone.includes(debouncedSearch)
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          Patient Management
        </Typography>
        {isReceptionist && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            Add Patient
          </Button>
        )}
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          label="Search patients by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: { xs: '100%', sm: 400 } }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Suspense
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <CircularProgress />
            </Box>
          }
        >
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Grid item xs={12} sm={6} lg={4} key={patient.id}>
                  <PatientCard
                    patient={patient}
                    onEdit={handleEditClick}
                    onDelete={handleDeletePatient}
                    userRole={isReceptionist ? 'RECEPTIONIST' : 'DOCTOR'}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box textAlign="center" py={4}>
                  <Typography variant="body1" color="textSecondary">
                    {search
                      ? 'No patients found matching your search.'
                      : 'No patients found.'}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Suspense>
      )}

      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {editingPatient ? 'Edit Patient' : 'Add New Patient'}
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Suspense fallback={<CircularProgress />}>
            <PatientForm
              onSubmit={editingPatient ? handleEditPatient : handleAddPatient}
              onCancel={handleCloseModal}
              initialData={editingPatient}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </Box>
  );
}