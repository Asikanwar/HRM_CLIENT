import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./profile.css";

const Profile = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [greeting, setGreeting] = useState('');
  const handleLogout = () => {
    // Remove token from localStorage (assuming token is stored in localStorage)
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.href = '/login'; // Redirect to your login route
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
        
        setUser(response.data);
        setEditableUser(response.data);
        setProfileImage(response.data.profileImage || ''); 
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value
    });
    
    // Set greeting message based on the entered first name
    if (name === 'first_name') {
      setGreeting(`Hi ${value}`);
    } else {
      setGreeting(''); // Clear the greeting if other fields are edited
    }
  };

  const handleEdit = () => {
    console.log('Edit clicked');
    setEditableUser({...user});
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      const formData = new FormData();
      for (const key in editableUser) {
        formData.append(key, editableUser[key]);
      }
      formData.append('profileImage', profileImage);

      const response = await axios.put(`http://localhost:3000/editData/${id}`, editableUser, { 
        headers: {
          'authorization': `Bearer ${token}`,
        }
      });
      
      console.log("User updated successfully", response.data);
      setUser(response.data);
    } catch(error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
      <div className="user-details-container">
        <ul className='butn'>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
        
        <div className="account-details">
          <h1>Account Details</h1>
          <form>
            <div className="form-group">
              <label className="label">First Name:</label>
              <input
                type="text"
                name="first_name"
                value={editableUser.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="label">Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={editableUser.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="label">Email:</label>
              <input
                type="email"
                name="email"
                value={editableUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-group">
              <button type="button" className="edit-button" onClick={handleEdit}>Edit</button>
              <button type="button" className="save-button" onClick={handleSave}>Save</button>
            </div>
          </form>
          {greeting && <p>{greeting}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
