import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './adminUsers.css'
import { toast } from 'react-toastify'

const UsersAdmin = () => {

  const [users,setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  const getUsers = async ()=>{

    const response = await axios.get('http://localhost:4000/admin/get-users')

    setUsers(response.data.data)
    console.log(response.data.data);
    
  }

  const handleBlock = async(userId)=>{
    console.log('block',userId);
    
    const response = await axios.put(`http://localhost:4000/admin/block-user?id=${userId}`)
    if(response.data.success){
        toast.success('User Blocked',{autoClose:1500})
        getUsers()
    }
  }

    const handleUnblock = async(userId)=>{
    console.log('unblock',userId);
    
    const response = await axios.put(`http://localhost:4000/admin/unblock-user?id=${userId}`)
    if(response.data.success){
        toast.success('User Unblocked',{autoClose:1500})
        getUsers()
    }
  }

  


  useEffect(()=>{
    getUsers()
  },[])

   
  return (
  <div className='user-list'>
    <h2>Users List</h2>

    <input
      type="text"
      placeholder="Search by name or email"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
    />

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Picture</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {users
          .filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.profileImage && (
                  <img
                    src={`http://localhost:4000/assets/${user.profileImage}`}
                    alt={user.name}
                    width="40"
                    height="40"
                  />
                )}
              </td>
              <td>
                {user.blocked ? (
                  <button onClick={() => handleUnblock(user._id)}>Unblock</button>
                ) : (
                  <button onClick={() => handleBlock(user._id)}>Block</button>
                )}
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default UsersAdmin