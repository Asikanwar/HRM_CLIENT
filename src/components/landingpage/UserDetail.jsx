import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewListPage.css';


const UserDetail = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [editableUser , setEditableUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("userId : ", id); 

        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
        console.log("response : ", response);
        
        setUser(response.data);
        setEditableUser(response.data)

        
        // console.log("user : ", user);
        
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);
  
  useEffect(() => {
    
    console.log("user : ", user);
  }, [user]);
  const handleEdit = () => {
  
    console.log('Edit clicked');
    setEditableUser({...user})
  };

  const handleSave = async () => {
    
    console.log('Save clicked');

    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.put(`http://localhost:3000/editData/${id}`,editableUser,
     { 
      headers : {
        'authorization' : `Bearer ${token}`
      }
      });
      console.log("user updated successfully",response.data)
      setUser(response.data)

    }catch(error){
      console.error('error updating user : ',error)

    }
  };

  

  const handleInputChange =(e)=>{
    setEditableUser({
      ...editableUser,
      [e.target.name]:e.target.value
    });

  }


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
    <div className="user-details-container">
      <h1>User Details</h1>
      <form>
        <div className="form-group">
          <label className="label">First Name:</label>

          {editableUser ? (
            <input type="text" name="first_name" value={editableUser.first_name} onChange={handleInputChange} />
          ) : (
          <input type="text" value={user.first_name} disabled = {true}/>
       ) }
        </div>
        <div className="form-group">
          <label className="label">Last Name:</label>

          {editableUser ? (
            <input type="text" name='last_name' value={editableUser.last_name} onChange={handleInputChange}/>
          ) : (
          <input type="text" value={user.last_name} disabled = {true}/>
        )}
        </div>
        <div className="form-group">
            <label className="label">Email:</label>
            {editableUser ? (
              <input type="email" name="email" value={editableUser.email} onChange={handleInputChange} />
            ) : (
              <input type="email" value={user.email}  />
            )}
          </div>
        {/* <div className="form-group">
          <label className="label">Password:</label>
          <input type="password" value={user.password} />
        </div> */}
        <div className="button-group">
          <button type="button" className="edit-button" onClick={handleEdit}>Edit</button>
          <button type="button" className="save-button" onClick={handleSave}>Save</button>
        </div>
      </form>
    </div>
    </div>
  );
};


export default UserDetail;
