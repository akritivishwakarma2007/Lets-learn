import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Form.css';
import ToastNotification from './ToastNotification';
import OAuthButtons from './OAuthButtons';

const LoginForm = () => {
  const { t } = useTranslation();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!emailOrUsername) newErrors.emailOrUsername = t('emailOrUsernameRequired');
    if (!password) newErrors.password = t('passwordRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful, token:', data.token);
        setToast({ message: 'Login successful! Redirecting...', type: 'success' });

        setTimeout(() => navigate('/select-language'), 2000);
      } else {
        setToast({ message: data.msg || 'Invalid credentials. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setToast({ message: 'Network error. Please try again later.', type: 'error' });
    }
  } else {
    setToast({ message: 'Please enter your credentials.', type: 'error' });
  }
};


  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            type="text"
            id="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className={errors.emailOrUsername ? 'input-error' : ''}
          />
          {errors.emailOrUsername && <p className="form-error">{errors.emailOrUsername}</p>}
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
        <button type="submit" className="form-submit-button">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register" className="form-link">Register here</a>
      </p>
      <p>
        <a href="/forgot-password" className="form-link">Forgot Password?</a>
      </p>
      <OAuthButtons onGoogleLogin={() => alert('Google Login')} onGitHubLogin={() => alert('GitHub Login')} />
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

export default LoginForm;
