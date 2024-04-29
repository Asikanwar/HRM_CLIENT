import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../popup_messages/PopupMessage';
import axios from 'axios';
import loginImage from '../landingpage/image/login1.png';


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setPopupType('error');
      setPopupMessage('Please fill in all fields');
      setShowPopup(true);
      return;
    }

    const SERVER_URL = 'http://localhost:3000';

    try {
      const response = await axios.post(`${SERVER_URL}/login`, {
        email,
        password,
      });

      const responseData = response.data;
      console.log(responseData)
      const token = responseData.data;
      console.log('token:', token);
      localStorage.setItem('token', token);

      setPopupType('success');
      setPopupMessage('Login Successful');
      setShowPopup(true);

      const user_type = responseData.user_type;
      const id = responseData.user_id;

      if(user_type==="65f3d64061496a1395461cf0"){
          navigate("/landingpage")
      }else{
        navigate(`/profile/${id}`);
      }

      // navigate('/Landingpage'); // Navigate to landing page after successful login
    } catch (error) {
      setPopupType('error');
      setPopupMessage(error.response.data.message || 'Error during login');
      setShowPopup(true);
      console.error('Error during login:', error.message);
    }
  };

  const handlePopupOK = () => {
    setShowPopup(false);
  };

  

  return (
    <div>
      <section className="vh-100 mt-5">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={loginImage} alt="Login" className="img-fluid" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="txt1">LOG IN</p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label">EMAIL</label>
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label">PASSWORD</label>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-body">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn5 btn-primary btn-dark"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} >
                    Login
                  </button>
                  <div className="small fw-bold mt-2 pt-1 mb-3">
                    Don't have an account?{' '}
                    <Link to="/register" className="link-danger">
                      Register
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showPopup && <Popup type={popupType} message={popupMessage} onOK={handlePopupOK} />}
      </section>
    </div>
  );
};

export default LoginPage;
