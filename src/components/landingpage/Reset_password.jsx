import React, { useState } from 'react';
import axios from 'axios';
import "./reset.css"
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = 'New password is required!';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Password confirmation is required!';
    }

    if (newPassword !== confirmPassword) {
      newErrors.passwordMismatch = 'New password and confirm password do not match!';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Do not proceed with submission if there are validation errors
    }

    const HOSTED_SERVER_URL = 'http://localhost:3000';

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      const response = await axios.patch(
        `${HOSTED_SERVER_URL}/reset-password`,
        { newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        alert('Password successfully changed!');
        setNewPassword('');
        setConfirmPassword('');
        navigate('/login')

      } else {
        console.error('Password change failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div className="row">
        <div className="col-sm-12">
          <div className="horizontal-container">
            <div className="progress-bar-container">
              <div className="custom-progress-line" style={{ width: '25%' }}></div>
              <li className="active">Reset password</li>
              <li className="finish-line"></li>
            </div>
            <div className="horizontal-form-box">
              <img src="https://static.stayjapan.com/assets/top/icon/values-7dd5c8966d7a6bf57dc4bcd11b2156e82a4fd0da94a26aecb560b6949efad2be.svg" alt="Password Reset Icon" />
              <p className="horizontal-heading">Reset your password</p>
              <p className="horizontal-subtitle">Your password needs to be at least 8 characters.</p>
              <form className="horizontal-form" onSubmit={handleResetPassword}>
                <div className="o3-form-group">
                  <label htmlFor="new_password">New password</label>
                  <input
                    type="password"
                    className="o3-form-control o3-input-lg"
                    id="new_password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
                </div>
                <div className="o3-form-group">
                  <label htmlFor="confirm_password">Confirm new password</label>
                  <input
                    type="password"
                    className="o3-form-control o3-input-lg"
                    id="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                  {errors.passwordMismatch && <p className="error-message">{errors.passwordMismatch}</p>}
                </div>
                <button type="submit" className="o3-btn o3-btn-primary o3-btn-block">
                  Set new password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
