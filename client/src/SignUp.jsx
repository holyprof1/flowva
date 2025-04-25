import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import 'animate.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strengthClass, setStrengthClass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('VITE_GOOGLE_CLIENT_ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length === 0) {
      setStrengthClass('');
      return;
    }

    let strength = 0;
    if (value.length > 7) strength++;
    if (value.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength++;
    if (value.match(/([0-9])/)) strength++;
    if (value.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength++;

    if (value.length < 6) {
      setStrengthClass('weak');
    } else if (strength <= 2) {
      setStrengthClass('medium');
    } else {
      setStrengthClass('strong');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      showMessage('Please fill in all fields', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showMessage('Passwords do not match', 'error');
      return;
    }
    if (password.length < 8) {
      showMessage('Password must be at least 8 characters', 'error');
      return;
    }
    try {
      setIsLoading(true);
      showMessage('Creating your account...', 'success');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        { email, password },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Signup response:', response.data);
      localStorage.setItem('token', response.data.token);
      showMessage('Account created successfully! Welcome to Flowva.', 'success');
      setTimeout(() => navigate('/onboarding'), 1500);
    } catch (err) {
      console.error('Signup error:', {
        response: err.response?.data,
        message: err.message,
        config: err.config,
      });
      showMessage(err.response?.data?.error || 'Sign up failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      console.log('Google signup request:', credentialResponse);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Google signup response:', response.data);
      localStorage.setItem('token', response.data.token);
      showMessage('Google sign-up successful! Redirecting...', 'success');
      setTimeout(() => navigate('/onboarding'), 1500);
    } catch (err) {
      console.error('Google signup error:', {
        response: err.response?.data,
        message: err.message,
        config: err.config,
      });
      showMessage(err.response?.data?.error || 'Google sign-up failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    console.log('Google sign-up failed');
    showMessage('Google sign-up failed', 'error');
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="container animate__animated animate__fadeInUp">
        <form id="signup-form" className="animate-form" onSubmit={handleSubmit}>
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Flowva
          </div>
          <div className="welcome">Join Flowva today</div>
          {message && (
            <div className={`form-message ${messageType}-message`} style={{ display: 'block' }}>
              {message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="signup-password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
            <div className="password-strength">
              <div className={`strength-meter ${strengthClass}`}></div>
            </div>
            <div className="password-hint" style={{ display: password.length > 0 ? 'block' : 'none' }}>
              Use at least 8 characters with a mix of letters, numbers & symbols
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <button type="submit" className={`btn ${isLoading ? 'btn-loading' : ''}`} disabled={isLoading}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
          <div className="divider">or continue with</div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            render={(renderProps) => (
              <button
                type="button"
                className={`btn btn-secondary ${isLoading ? 'btn-loading' : ''}`}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled || isLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.20-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {isLoading ? 'Loading...' : 'Google'}
              </button>
            )}
          />
          <div className="form-footer">
            Already have an account? <a href="/signin">Sign in</a>
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignUp;