import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Employe.css"




function Employe() {
  const [isMenuActive, setIsMenuActive] = useState(false);
   const [user, setUser] = useState(null);
  const { id } = useParams(); 
  console.log("id : ",id)
  const navigate = useNavigate() ;

 
  
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');


       
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
         setUser(response.data);
        
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);
  

 

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const logout = async()=>{
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:3000/logout', null, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });
      localStorage.removeItem('accessToken');
      navigate('/login')
      
    } catch (error) {
      console.error('error logging out : ',error)
    }
  }

  return (
    <div className="main_code dark">
      <div className="front">
        <div className="nav-bar">
          <div className="nav-name">
          {user && (
            <div className="nav-name">
              <h1 className="profile-name font-24px">Hi {user.first_name},</h1>
            </div>
          )}
          </div>
          <div className="nav-items">
            <ul className="nav-list font-16px">
              <li className="nav-item">
                <a href="#" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="#project" className="nav-link">Contact</a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a href="#publication" className="nav-link">Publication</a>
              </li>
              <li>
                <div className="profile" onClick={toggleMenu}>
                  <button className='profilebutton'>
                  <img src="/user.png" alt='profile'/>

                  </button>
                </div>
                {isMenuActive && (
                  <div className="menu active">
                    <ul>
                      <li><a href="#">Dashboard</a></li>
                      {/* Link to view the profile of the logged-in user */}
                      <li>
                      <Link to={`/profile-view/${id}`}>View Profile</Link></li>
                      {/* <li><a href="#">Log Out</a></li> */}
                      <li><button className='logoutbutton' onClick={logout}>Log Out</button></li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employe;