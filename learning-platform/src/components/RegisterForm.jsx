import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'; // ✅ correct

import { useTranslation } from 'react-i18next';
import '../styles/Form.css';
import ToastNotification from './ToastNotification';

const RegisterForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = t('emailRequired');
    if (!username) newErrors.username = t('usernameRequired');
    if (!password) newErrors.password = t('passwordRequired');
    if (password !== confirmPassword) newErrors.confirmPassword = t('passwordsMismatch');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ message: 'Registration successful! Redirecting to login...', type: 'success' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setToast({ message: data.msg || 'Registration failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setToast({ message: 'Network error. Please try again later.', type: 'error' });
    }
  } else {
    setToast({ message: 'Please correct the form errors.', type: 'error' });
  }
};


  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
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
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && <p className="form-error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? 'input-error' : ''}
          />
          {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="form-submit-button">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login" className="form-link">Login here</a>
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

export default RegisterForm;
