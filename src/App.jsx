import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingpage/Landingpage';
import LoginPage from './components/landingpage/Loginpage';
import AddUserPage from './components/landingpage/Adduserpage';
import ViewListPage from './components/landingpage/ViewListPage';
import UserDetail from './components/landingpage/UserDetail';
import ForgotPassword from './components/landingpage/Forgot_password';
import ResetPassword from './components/landingpage/Reset_password';
import Employe from './components/landingpage/Employe';

import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/landingpage/profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/viewList" element={<ViewListPage />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user" element={<Employe />} />
        <Route path="/profile/:id" element={<Profile />} />


        
      </Routes>
    </Router>
  );
};

export default App;
