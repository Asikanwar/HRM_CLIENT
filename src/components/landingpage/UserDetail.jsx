import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './ViewListPage.css'; // Import CSS file

export default function UserDetail() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getuser');
        setData(response.data.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 
  const handleView = (item) => {
    setSelectedUser(item);
  };
 
  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    if (selectedUser) {
      // Here you can perform any actions when selectedUser changes
      console.log('Selected user:', selectedUser);
    }
  }, [selectedUser]);

  return (
    <div className="container">
      <h1>User List</h1>
      <ul>
        {data.map((user, index) => (
          <li key={index}>
            {user.name} - 
            <button onClick={() => handleView(user)}>View</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="user-details">
          <h2>User Details</h2>
          <p><strong>ID:</strong> {selectedUser._id}</p>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Address:</strong> {selectedUser.address}</p>
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
}
