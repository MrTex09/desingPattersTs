/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users'); 

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleMakeAdmin = async (userId: string) => {
    try {
      await axios.patch(`http://localhost:3000/api/users/${userId}/role`, { role: 'admin' }); 
      setUsers(users.map(user =>
        user.id === userId ? { ...user, role: 'admin' } : user
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.username} - {user.role}</span>
            {user.role !== 'admin' && (
              <button onClick={() => handleMakeAdmin(user.id)}>Make Admin</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
