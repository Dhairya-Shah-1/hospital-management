'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Grid, Button, Box, FormControl, InputLabel, Select, MenuItem, Autocomplete,  Typography, CircularProgress} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '@/lib/store/slices/patientsSlice';
import { fetchDoctors } from '@/lib/store/slices/doctorsSlice';

export default function AppointmentForm({ onSubmit, onCancel, initialData }) {
  const dispatch = useDispatch();
  const { patients } = useSelector((state) => state.patients);
  const { doctors } = useSelector((state) => state.doctors);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      patientId: initialData?.patientId || '',
      doctorId: initialData?.doctorId || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
      time: initialData?.time || '',
      reason: initialData?.reason || '',
      notes: initialData?.notes || '',
      status: initialData?.status || 'scheduled',
    },
  });

  const [availableTimeSlots] = useState([
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([dispatch(fetchPatients()), dispatch(fetchDoctors())]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const selectedPatient = patients.find((p) => p.id === parseInt(watch('patientId')));
  const selectedDoctor = doctors.find((d) => d.id === parseInt(watch('doctorId')));

  const handleFormSubmit = (data) => {
    const appointmentData = {
      ...data,
      id: initialData?.id,
      patientId: parseInt(data.patientId),
      doctorId: parseInt(data.doctorId),
      patientName: selectedPatient?.name || '',
      doctorName: selectedDoctor?.name || '',
      status: data.status || 'scheduled',
    };
    onSubmit(appointmentData);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="patientId"
            control={control}
            rules={{ required: 'Patient is required' }}
            render={({ field }) => (
              <Autocomplete
                options={patients}
                getOptionLabel={(option) => `${option.name} - ${option.email}`}
                value={patients.find((p) => p.id === parseInt(field.value)) || null}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id || '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Patient"
                    error={!!errors.patientId}
                    helperText={errors.patientId?.message}
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="doctorId"
            control={control}
            rules={{ required: 'Doctor is required' }}
            render={({ field }) => (
              <Autocomplete
                options={doctors}
                getOptionLabel={(option) => `${option.name} - ${option.specialization}`}
                value={doctors.find((d) => d.id === parseInt(field.value)) || null}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id || '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Doctor"
                    error={!!errors.doctorId}
                    helperText={errors.doctorId?.message}
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('date', { required: 'Date is required' })}
            error={!!errors.date}
            helperText={errors.date?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.time}>
            <InputLabel>Time</InputLabel>
            <Controller
              name="time"
              control={control}
              rules={{ required: 'Time is required' }}
              render={({ field }) => (
                <Select {...field} label="Time">
                  {availableTimeSlots.map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.time && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                {errors.time.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Reason for Visit"
            multiline
            rows={2}
            {...register('reason', { required: 'Reason is required' })}
            error={!!errors.reason}
            helperText={errors.reason?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="Additional Notes" multiline rows={3} {...register('notes')} />
        </Grid>

        {selectedPatient && (
          <Grid item xs={12}>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2">
                <strong>Patient Info:</strong> {selectedPatient.name} | Phone:{' '}
                {selectedPatient.phone} | Blood Type: {selectedPatient.bloodType || 'N/A'}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {initialData ? 'Update Appointment' : 'Book Appointment'}
        </Button>
      </Box>
    </form>
  );
}