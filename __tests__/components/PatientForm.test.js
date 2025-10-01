import { render, screen, fireEvent } from '@testing-library/react';
import PatientForm from '@/components/forms/PatientForm';

describe('PatientForm', () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('renders all form fields', () => {
    render(<PatientForm onSubmit={onSubmit} onCancel={onCancel} />);
    ['Full Name','Email','Phone','Date of Birth','Address'].forEach(label =>
      expect(screen.getByLabelText(new RegExp(label, 'i'))).toBeInTheDocument()
    );
  });

  test('shows validation errors', async () => {
    render(<PatientForm onSubmit={onSubmit} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /save patient/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  test('calls onSubmit with valid data', async () => {
    render(<PatientForm onSubmit={onSubmit} onCancel={onCancel} />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '2000-01-01' } });
    fireEvent.click(screen.getByRole('button', { name: /save patient/i }));
    await new Promise(r => setTimeout(r, 0));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Alice',
      email: 'a@b.com',
      phone: '123',
      dateOfBirth: '2000-01-01'
    }));
  });

  test('calls onCancel', () => {
    render(<PatientForm onSubmit={onSubmit} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});