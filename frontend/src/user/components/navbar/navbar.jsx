import React from 'react'
import './navbar.css' 
import { Link, useNavigate } from 'react-router-dom'
import profilePic from './../../../assets/profilePic.png'



const Navbar = ({ toggleSidebar }) => {

  const navigate = useNavigate()
  

  const handleLogout = () => {
    localStorage.removeItem('token')
   navigate('/user/login')
  }

  return (
    <div className='navbar'>
      <div className='logo'>
        <p>EDUNITY</p>
      </div>
      <Link to='/user/myCourses'>
              <button className='add-course'>My Courses</button>
              </Link>
      <div className='profile-section'>
        
        <div className='hamburger' onClick={toggleSidebar}>
          ☰
        </div>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
        <Link to='/user/profile'>
          <img src={profilePic} alt='Profile' className='profile-img' />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
