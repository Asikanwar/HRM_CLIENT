import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import './ViewListPage.css'; // Import CSS file

function ViewListPage() {
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
   const handleEdit = (item) => {
push(`/edituser/${item._id}`);
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>
              <Link to={{ pathname: "/userdetails", state: { user: item } }}>
                <button onClick={() => handleView(item)}>View</button></Link>
                <button onClick={() => handleEdit(item)}>Edit</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div className="user-details">
          <h2>User Details</h2>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Address:</strong> {selectedUser.address}</p>
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
}

export default ViewListPage;