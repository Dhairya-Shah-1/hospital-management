'use client';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Divider } from '@mui/material';
import { Dashboard, People, LocalHospital, Event, Schedule, ExitToApp } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/lib/store/slices/authSlice';

const drawerWidth = 280;

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Patients', icon: <People />, path: '/dashboard/patients', roles: ['RECEPTIONIST'] },
    { text: 'Doctors', icon: <LocalHospital />, path: '/dashboard/doctors' },
    { text: 'Appointments', icon: <Event />, path: '/dashboard/appointments' },
    { text: 'My Schedule', icon: <Schedule />, path: '/dashboard/schedule', roles: ['DOCTOR'] },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  const filteredMenuItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(user?.role)
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          HMS
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Hospital Management
        </Typography>
      </Box>

      <Divider />

      <List>
        {filteredMenuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => router.push(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Drawer>
  );
}