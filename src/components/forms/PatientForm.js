'use client';
import { useForm } from 'react-hook-form';
import { TextField, Grid, Button, Box, MenuItem } from '@mui/material';

export default function PatientForm({ onSubmit, onCancel, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:
      initialData || {
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        bloodType: '',
        emergencyContact: '',
        allergies: '',
      },
  });

  const handleFormSubmit = (data) => {
    const patientData = {
      ...data,
      allergies: data.allergies.trim() === '' ? 'None' : data.allergies,
      id: initialData?.id || Date.now(),
    };
    onSubmit(patientData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            {...register('name', {
              required: 'Name is required',
              validate: (value) =>
                value.trim() !== '' || 'Invalid value',
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Please enter a valid email',
              },
              validate: (value) =>
                value.trim() !== '' || 'Invalid value',
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            inputProps={{ maxLength: 10 }}
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone must be 10 digits',
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('dateOfBirth', {
              required: 'Date of birth is required',
            })}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            multiline
            rows={2}
            {...register('address', {
              required: 'Address is required',
              validate: (value) =>
                value.trim() !== '' || 'Invalid value',
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Blood Type"
            defaultValue=""
            {...register('bloodType', {
              required: 'Blood type is required',
            })}
            error={!!errors.bloodType}
            helperText={errors.bloodType?.message}
          >
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Emergency Contact"
            {...register('emergencyContact', {
              required: 'Emergency contact is required',
              validate: (value) =>
                value.trim() !== '' || 'Invalid value',
            })}
            error={!!errors.emergencyContact}
            helperText={errors.emergencyContact?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Allergies"
            multiline
            rows={2}
            placeholder="List any allergies or 'None'"
            {...register('allergies')}
            error={!!errors.allergies}
            helperText={errors.allergies?.message}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save Patient
        </Button>
      </Box>
    </form>
  );
}