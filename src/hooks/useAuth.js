import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/lib/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  return {
    user,
    isAuthenticated,
    loading,
    logout: handleLogout,
    isReceptionist: user?.role === 'RECEPTIONIST',
    isDoctor: user?.role === 'DOCTOR'
  };
};