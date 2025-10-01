import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from '@/app/auth/login/page';
import authSlice from '@/lib/store/slices/authSlice';

jest.mock('next/navigation', () => ({ // Mock next/navigation
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockStore = configureStore({
  reducer: {
    auth: authSlice,
  },
});

const MockedLoginPage = () => (
  <Provider store={mockStore}>
    <LoginPage />
  </Provider>
);

describe('LoginPage', () => {
  test('renders login form', () => {
    render(<MockedLoginPage />);
    
    expect(screen.getByText(/hospital management system/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    render(<MockedLoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid credentials', async () => {
    render(<MockedLoginPage />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => { // Form should submit without validation errors
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
    });
  });
});