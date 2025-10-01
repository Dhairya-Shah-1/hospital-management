'use client';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { People, LocalHospital, Event, Assignment } from '@mui/icons-material';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" color={color}>
            {value}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {title}
          </Typography>
        </Box>
        <Icon sx={{ fontSize: 40, color }} />
      </Box>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Patients" value="2,456" icon={People} color="primary.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Doctors" value="42" icon={LocalHospital} color="success.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Today's Appointments" value="78" icon={Event} color="warning.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Pending Reports" value="15" icon={Assignment} color="error.main" />
        </Grid>
      </Grid>
    </Box>
  );
}