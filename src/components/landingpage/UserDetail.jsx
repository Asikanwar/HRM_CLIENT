import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewListPage.css';

const UserDetail = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
        setProfileImage(response.data.profileImage || null);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);
  
  const handleEdit = () => {
    console.log('Edit clicked');
    setEditableUser({ ...user });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('Save clicked');

    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();

      // Append editableUser fields to formData
      for (const key in editableUser) {
        formData.append(key, editableUser[key]);
      }

      // Append profileImage if it's selected
      if (profileImage) {
        formData.append('profileImage', profileImage); // Ensure this matches your backend's file field name
      }

      console.log('FormData:', formData); // Check FormData before sending

      const response = await axios.put(`http://localhost:3000/editData/${id}`, formData, { 
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Ensure correct content type
        }
      });

      console.log("User updated successfully", response.data);
      setUser(response.data);

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditableUser({
      ...editableUser,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    // Display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
      <div className="user-details-container">
        <h1>User Details</h1>
        <form onSubmit={handleSave}>
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
              name='last_name'
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
          <div className="form-group">
            <label className="label">Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Profile Preview" className="image-preview" />
            )}
          </div>
          <div className="button-group">
            <button type="button" className="edit-button" onClick={handleEdit}>Edit</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
