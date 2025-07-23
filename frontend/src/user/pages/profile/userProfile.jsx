// pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import profilePic from './../../../assets/profilePic.png'

import './userProfile.css'

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const ProfilePage = () => {

  const [user,setUser] = useState({})

  const navigate = useNavigate()

  

  const token = localStorage.getItem('token')

  const getProfile  = async  ()=>{
    const response = await axios.get('http://localhost:4000/user/profile',{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    
    console.log(response.data.data);
     
    setUser(response.data.data)
    console.log('user',user);
    
    if(response.data.data.blocked){
      localStorage.removeItem('token')
      navigate('/user/login')
    }
  }

  useEffect(()=>{
    getProfile()
    // console.log('user',user);
    
   
    
  },[])

   return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={user.profileImage ? `http://localhost:4000/assets/${user.profileImage}`  : profilePic} 
          alt="Profile"
          className="profile-avatar"
        />
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> student</p>

        <div className="btn-edit">
          <Link to='/user/editProfile'>
            <button>Edit</button>
          </Link>
          <Link to='/user/changePassword' >
            <button className="change-password-btn">Change Password</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
