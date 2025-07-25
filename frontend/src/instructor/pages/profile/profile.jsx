import React, { useEffect, useState } from 'react'
import profilePic from './../../../assets/profilePic.png'
import { Link } from 'react-router-dom'
import './profile.css'
import axios from 'axios'


const Profile = () => {
  const [user,setUser] = useState({})
  
    const token = localStorage.getItem('instructor')
  
    const getProfile  = async  ()=>{
      const response = await axios.get('http://localhost:4000/instructor/profile',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      })
      
      console.log(response.data.data);
      setUser(response.data.data)
    }
  
    useEffect(()=>{
      getProfile()
      
    },[])
  
     return (
      <div className="profile-container">
        <div className="profile-card">
          <img
            src={user.profileImage
                ? `http://localhost:4000/assets/${user.profileImage}`
                : profilePic}
            alt="Profile"
            className="profile-avatar"
          />
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><string>Bio:</string>{user.bio}</p>
          <p><strong>Role:</strong> Instructor</p>
          <p><strong>Expertise:</strong>{user.expertise}</p>
          <p><strong>KYC application:</strong>
          
            {user.KYCstatus === 'verified' ? (
                user.KYCstatus
            ) : (
                <Link to="/instructor/kyc">
                <button className="kyc-button">Verify</button>
                </Link>
            )}
            </p>


          <div className="btn-edit">
            <Link to='/instructor/editProfile'>
              <button className='edit-btn'>Edit</button>
            </Link>
            <Link to='/instrcutor/passwordChange'>
              <button className='pass-btn'>Change password</button>
            </Link>
            
          </div>
  
        </div>
      </div>
  )
}

export default Profile
