import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingpage/Landingpage';
import LoginPage from './components/landingpage/Loginpage';
import AddUserPage from './components/landingpage/Adduserpage';
import ViewListPage from './components/landingpage/ViewListPage';
import UserDetail from './components/landingpage/UserDetail';


import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Landingpage" element={<LandingPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/viewList" element={<ViewListPage />} />
        <Route path="/userdetails" element={<UserDetail/>} />

        
      </Routes>
      
    </Router>
  );
};

export default App;
