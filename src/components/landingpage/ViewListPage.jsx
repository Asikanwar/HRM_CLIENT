import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ViewListPage = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/users?page=${currentPage}&pageSize=${pageSize}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      const responseData = response.data.data;
      setUsers(responseData.datas);
      setTotalPages(responseData.totalPages);
      setCurrentPage(responseData.currentPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("User deleted successfully");

      // Update the user list in the state by removing the deleted user
      setUsers(users.filter(user => user._id !== id));

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      console.log("No more pages available");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      console.log("No more pages available");
    }
  };

  return (
    <div className='container'>
      <h1>User List</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userData) => (
            <tr key={userData._id}>
              <td>{userData.first_name}</td>
              <td>{userData.last_name}</td>
              <td>
                <Link to={`/User-Detail/${userData._id}`}>
                  <button>
                    View
                  </button>
                </Link>
              </td>
              <td>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button onClick={handlePreviousPage}>&lt;</button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage}>&gt;</button>
      </div>
    </div>
  );
};

export default ViewListPage;
