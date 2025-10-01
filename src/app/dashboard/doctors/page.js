'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, FormControl, Select, MenuItem,InputLabel, TextField } from '@mui/material';
import { LocalHospital, Email, Phone, School } from '@mui/icons-material';
import { fetchDoctors, setSelectedSpecialization } from '@/lib/store/slices/doctorsSlice';

function DoctorCard({ doctor }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
              mr: 2,
            }}
          >
            {doctor.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Avatar>
          <Box>
            <Typography variant="h6" gutterBottom>
              {doctor.name}
            </Typography>
            <Chip
              label={doctor.specialization}
              color="primary"
              size="small"
              icon={<LocalHospital />}
            />
          </Box>
        </Box>

        <Box mb={2}>
          <Typography
            variant="body2"
            color="textSecondary"
            display="flex"
            alignItems="center"
            mb={1}
          >
            <Email sx={{ mr: 1, fontSize: 16 }} />
            {doctor.email}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            display="flex"
            alignItems="center"
            mb={1}
          >
            <Phone sx={{ mr: 1, fontSize: 16 }} />
            {doctor.phone}
          </Typography>
          <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
            <School sx={{ mr: 1, fontSize: 16 }} />
            {doctor.education}
          </Typography>
        </Box>

        <Typography variant="body2" color="primary">
          Experience: {doctor.experience}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function DoctorsPage() {
  const dispatch = useDispatch();
  const { filteredDoctors, loading, selectedSpecialization } = useSelector(
    (state) => state.doctors
  );
  const [searchTerm, setSearchTerm] = useState('');

  const specializations = ['all','Cardiology','Pediatrics','Orthopedics','Neurology','Dermatology','Oncology'];

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleSpecializationChange = (event) => {
    dispatch(setSelectedSpecialization(event.target.value));
  };

  const displayedDoctors = filteredDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Doctor Directory
      </Typography>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Specialization</InputLabel>
          <Select
            value={selectedSpecialization}
            onChange={handleSpecializationChange}
            label="Specialization"
          >
            {specializations.map((spec) => (
              <MenuItem key={spec} value={spec}>
                {spec === 'all' ? 'All Specializations' : spec}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {loading ? (
        <Typography>Loading doctors...</Typography>
      ) : (
        <Grid container spacing={3}>
          {displayedDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && displayedDoctors.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="textSecondary">
            No doctors found matching your criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
}