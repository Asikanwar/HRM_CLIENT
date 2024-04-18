import React, { useState } from 'react';
import Popup from '../popup_messages/PopupMessage'
import axios from 'axios';
import loginImage from "../landingpage/image/login1.png"; // Import the image
import { Navigate ,useNavigate} from 'react-router-dom';



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
  
      let responseData = await response.data;
      let token = responseData.data;
      console.log("token:", token);
      console.log("statuscode:",response.data.statusCode);
      console.log("message:",response.data.message)
      localStorage.setItem("token", token);
      
      setPopupType('success');
      setPopupMessage('Login Successful');
      setShowPopup(true); 
      
    } catch (error) {
      setPopupType('error');
      setPopupMessage(error.response.data.message);
      setShowPopup(true);
      console.error('Error during login:', error.response.data.message);
    }
  };

  const handlePopupOK = () => {
    setShowPopup(false);
    navigate('/Landingpage')
  };

  const handlePopupTryAgain = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <section className="vh-100 mt-5">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src={loginImage} // Use the imported image
                alt="Login"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
        <p className='txt1'>LOG IN</p>
               
              </div>
              
              {/* Email input */}
              <form onSubmit={handleLogin}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                   EMAIL
                  </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    PASSWORD
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      defaultValue=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <div href="#!" className="text-body">
                    Forgot password?
                  </div>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-dark"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                    Login
                  </button>
                  <div className="small fw-bold mt-2 pt-1 mb-3">
                    Don't have an account?{' '}
                    <div href="#!" className="link-danger">
                      {/* <Link to="/add-user">ADD USER</Link> */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showPopup && <Popup type={popupType} message={popupMessage} onOK={handlePopupOK} onTryAgain={handlePopupTryAgain}/>}
      </section>
    </div>
  );
};

export default LoginPage;
