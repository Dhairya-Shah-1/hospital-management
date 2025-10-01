import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material/CircularProgress';

const Loading = () => <CircularProgress />;

export const LazyPatientForm = dynamic(() => import('@/components/forms/PatientForm'), {loading: Loading});

export const LazyAppointmentForm = dynamic(() => import('@/components/forms/AppointmentForm'), {loading: Loading});

export const LazyDataTable = dynamic(() => import('@/components/ui/DataTable'), {loading: Loading});