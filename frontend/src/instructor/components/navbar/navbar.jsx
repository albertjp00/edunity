import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import profileImage from '../../../assets/profilePic.png'
import './navbar.css'



const Navbar = () => {

    const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('instructor')
   navigate('/instructor/login')
  }

  return (
    <div className='navbar'>
      <div className='logo'>
        <p>EDUNITY</p>
      </div>
    <Link to='/instructor/addCourse'>
        <button className='add-course'>Add Course</button>
        </Link>
      <div className='profile-section'>
        {/* <div className='hamburger' onClick={toggleSidebar}>
          ☰
        </div> */}
        
        <div className="nav-right">
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
        <Link to='/instructor/profile'>
          <img src={profileImage} alt='Profile' className='profile-img' />
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
