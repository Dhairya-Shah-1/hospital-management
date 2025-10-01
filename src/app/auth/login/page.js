'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Container, Paper, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/store/slices/authSlice';
import { mockLogin } from '@/lib/api/mockApi';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await mockLogin(data);
      dispatch(login(response));
      localStorage.setItem('token', response.accessToken);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.' || err.message);
      setTimeout(() => {setError(null);}, 10000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 2, boxShadow: 5 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Hospital Management System
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Sign in to continue
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth label="Email" type="email" margin="normal" {...register('email', { required: 'Email is required' })} error={!!errors.email} helperText={errors.email?.message} />
            
            <TextField fullWidth label="Password" type="password" margin="normal" {...register('password', { required: 'Password is required' })} error={!!errors.password} helperText={errors.password?.message} />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>

        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Demo Accounts:
            <br />
            Receptionist: receptionist@hospital.com / password123
            <br />
            Doctor: doctor@hospital.com / password123
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}