'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { AccessTime, Person, Assignment } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorAppointments } from '@/lib/store/slices/appointmentsSlice';

function AppointmentCard({ appointment }) {
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
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" display="flex" alignItems="center" gutterBottom>
              <Person sx={{ mr: 1 }} />
              {appointment.patientName}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              mb={1}
            >
              <AccessTime sx={{ mr: 1, fontSize: 16 }} />
              {appointment.time}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center" mb={1}>
              <Assignment sx={{ mr: 1, fontSize: 16 }} />
              {appointment.reason}
            </Typography>
          </Box>
          <Chip
            label={appointment.status}
            color={getStatusColor(appointment.status)}
            size="small"
          />
        </Box>
        {appointment.notes && (
          <Typography variant="body2" color="textSecondary">
            <strong>Notes:</strong> {appointment.notes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default function SchedulePage() {
  const dispatch = useDispatch();
  const { doctorAppointments, loading, error } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (user?.id) {
      dispatch(
        fetchDoctorAppointments({
          doctorId: user.id,
          date: selectedDate,
        })
      );
    }
  }, [dispatch, user?.id, selectedDate]);

  if (user?.role !== 'DOCTOR') {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="error">
          Access denied. This page is only for doctors.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>
        My Schedule
      </Typography>

      <Box mb={3}>
        <TextField
          label="Select Date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 200 }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Appointments for {selectedDate} ({doctorAppointments.length})
            </Typography>
            {doctorAppointments.length > 0 ? (
              doctorAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <Box textAlign="center" py={4}>
                <Typography variant="body1" color="textSecondary">
                  No appointments scheduled for {selectedDate}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}