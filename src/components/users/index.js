import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { backend_url } from "../../config.dev.json";
import './style.scss';

const Users = () => {
  const [users, setUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedPosition, setSelectedPosition] = useState(''); 
  const positions = ['TSE', 'ZSM', 'ASM', 'ABM']; 

  useEffect(() => {
   
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backend_url}/users/getUser`); 
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
        setLoading(false); 
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers(); 
  }, []);

  useEffect(() => {
    // Filter users based on search term and position
    const filtered = users.filter((user) => {
      const matchesSearchTerm = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.position.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPosition = selectedPosition ? user.position === selectedPosition : true;

      return matchesSearchTerm && matchesPosition;
    });

    setFilteredUsers(filtered);
  }, [searchTerm, selectedPosition, users]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="user-container">
      <h2 className="user-title">Users</h2>

      {/* Search and filter section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by name, email, or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="position-dropdown"
        >
          <option value="">All Positions</option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th className="field-label">Name</th>
            <th className="field-label">Email</th>
            <th className="field-label">Position</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the filtered users array and display each user's data */}
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
