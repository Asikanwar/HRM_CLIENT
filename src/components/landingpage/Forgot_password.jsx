import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('Email is required');
      setSubmitting(false);
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      setSubmitting(false);
      return;
    }

    const server = 'http://localhost:3000';
    try {
      const response = await axios.post(`${server}/forgot-password`, { email });
      console.log('Response:', response);
      if (response.status === 200) {
        setSuccessMessage('Email sent successfully. Check your inbox.');
        setEmail('');
      } else {
        setErrorMessage('Email sending failed. Please try again.');
      }
    } catch (error) {
      console.error('Error sending forgot password request:', error.message);
      setErrorMessage('Something went wrong. Please try again later.');
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Forgot Password</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your Email
              </label>
              <input
                type="email"
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
