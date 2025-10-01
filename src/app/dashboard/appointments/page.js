'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add, Cancel, Edit, AccessTime, Person, LocalHospital, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAppointments,
  addAppointment,
  updateAppointment,
  setSelectedDate,
} from '@/lib/store/slices/appointmentsSlice';
import AppointmentForm from '@/components/forms/AppointmentForm';

function AppointmentCard({ appointment, onCancel, onEdit, userRole }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'success';
      case 'completed':
        return 'primary';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Person sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" gutterBottom>
            {appointment.patientName}
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
            <LocalHospital sx={{ mr: 1, fontSize: 16 }} />
            {appointment.doctorName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            display="flex"
            alignItems="center"
            mb={1}
          >
            <AccessTime sx={{ mr: 1, fontSize: 16 }} />
            {appointment.date} at {appointment.time}
          </Typography>
          <Typography variant="body2" mb={1}>
            <strong>Reason:</strong> {appointment.reason}
          </Typography>
          {appointment.notes && (
            <Typography variant="body2" color="textSecondary">
              <strong>Notes:</strong> {appointment.notes}
            </Typography>
          )}
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip
            label={appointment.status}
            color={getStatusColor(appointment.status)}
            size="small"
          />
          {userRole === 'RECEPTIONIST' && appointment.status === 'scheduled' && (
            <Box>
              <IconButton size="small" onClick={() => onEdit(appointment)} color="primary">
                <Edit />
              </IconButton>
              <IconButton size="small" onClick={() => onCancel(appointment.id)} color="error">
                <Cancel />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function AppointmentsPage() {
  const dispatch = useDispatch();
  const { appointments, loading, selectedDate, error } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleAddAppointment = async (appointmentData) => {
    try {
      await dispatch(addAppointment(appointmentData)).unwrap();
      setOpen(false);
      setEditingAppointment(null);
    } catch (err) {
      console.error('Failed to add appointment:', err);
    }
  };

  const handleEditAppointment = async (appointmentData) => {
    try {
      await dispatch(
        updateAppointment({
          id: editingAppointment.id,
          updates: appointmentData,
        })
      ).unwrap();
      setEditingAppointment(null);
      setOpen(false);
    } catch (err) {
      console.error('Failed to update appointment:', err);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await dispatch(
        updateAppointment({
          id: appointmentId,
          updates: { status: 'cancelled' },
        })
      ).unwrap();
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
    }
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingAppointment(null);
  };

  const handleNewAppointment = () => {
    setEditingAppointment(null);
    setOpen(true);
  };

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === selectedDate
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Appointment Management</Typography>
        {user?.role === 'RECEPTIONIST' && (
          <Button variant="contained" startIcon={<Add />} onClick={handleNewAppointment}>
            New Appointment
          </Button>
        )}
      </Box>

      {/* Date Selection */}
      <Box display="flex" gap={2} mb={3} alignItems="center">
        <TextField
          label="Select Date"
          type="date"
          value={selectedDate}
          onChange={(e) => dispatch(setSelectedDate(e.target.value))}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 200 }}
        />
        <Typography variant="body1" color="textSecondary">
          Showing {filteredAppointments.length} appointments for {selectedDate}
        </Typography>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        /* Responsive Appointment Grid */
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <Grid item xs={12} sm={6} lg={4} key={appointment.id}>
                <AppointmentCard
                  appointment={appointment}
                  onCancel={handleCancelAppointment}
                  onEdit={handleEditClick}
                  userRole={user?.role}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box textAlign="center" py={4}>
                <Typography variant="body1" color="textSecondary">
                  No appointments scheduled for {selectedDate}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* New/Edit Appointment Modal */}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {editingAppointment ? 'Edit Appointment' : 'Book New Appointment'}
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <AppointmentForm
            onSubmit={editingAppointment ? handleEditAppointment : handleAddAppointment}
            onCancel={handleCloseModal}
            initialData={editingAppointment}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}