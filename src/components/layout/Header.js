'use client';
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Welcome back, {user?.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="textSecondary">
            {user?.role}
          </Typography>
          <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.charAt(0)}</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}