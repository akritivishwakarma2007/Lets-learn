import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Form.css';
import ToastNotification from '../components/ToastNotification';

const ForgotPassword= () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = t('emailRequired');
    // Basic email format validation
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = t('invalidEmailFormat');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Password reset requested for:', { email });
      // Simulate API call for password reset
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5; // Simulate success/failure
        if (isSuccess) {
          setToast({ message: 'Password reset link sent to your email!', type: 'success' });
          setTimeout(() => navigate('/login'), 3000); // Redirect to login after a delay
        } else {
          setToast({ message: 'Failed to send reset link. Please try again.', type: 'error' });
        }
      }, 1000);
    } else {
      setToast({ message: 'Please enter a valid email address.', type: 'error' });
    }
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        <button type="submit" className="form-submit-button">Send Reset Link</button>
      </form>
      <p>
        Remember your password? <a href="/login" className="form-link">Login here</a>
      </p>
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
