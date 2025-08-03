// pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import profilePic from './../../../assets/profilePic.png'


import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './userProfile.css'
import Navbar from '../../components/navbar/navbar';
import api from '../../../api/axios';



const ProfilePage = () => {

  const [user,setUser] = useState({})
    const [courses, setCourses] = useState([]);
  

  const navigate = useNavigate()

  

  const token = localStorage.getItem('token')

  const getProfile  = async  ()=>{
    const response = await api.get('/user/profile',{  
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

    const fetchCourses = async () => {
      try {
        console.log('fetching');
        
        const res = await axios.get(`http://localhost:4000/user/myCourses?id=${token}`);
        if (res.data.success) {
          setCourses(res.data.courses);
          console.log('courses',res.data);
          
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    const gotoCourse =(id)=>{
      navigate(`/user/viewMyCourse/${id}`)
    }


  useEffect(()=>{
    getProfile()
    fetchCourses()
    // console.log('user',user);
    
   
    
  },[])

   return (
    <> 
    <Navbar />
  <div className="profile-container1">
    
    <div className="profile-left">
      <div className="profile-card1">
        <div className="user-name-card">
          <img
          src={user.profileImage ? `http://localhost:4000/assets/${user.profileImage}` : profilePic}
          alt="Profile"
          className="profile-avatar"
        />
        
        <div className="details">
          <h2>{user.name}</h2>
        <h5>Email: {user.email}</h5>
        </div>

        </div>
        <div className="about-me">
          <h4>About me</h4>
          <p>{user.bio}</p>
        </div>
        

        <div className="user-details-box">
          <p><i className="fas fa-user-tag"></i> <strong>Role:</strong> Student</p>
          <p><i className="fas fa-venus-mars"></i> <strong>Gender:</strong> {user.gender}</p>
          <p><i className="fas fa-birthday-cake"></i> <strong>DOB:</strong> {user.dob}</p>
          <p><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {user.location}</p>
          <p><i className="fas fa-phone"></i> <strong>Phone:</strong> {user.phone}</p>
        </div>

        <div className="btn-edit">
          <Link to='/user/editProfile'>
            <button>Edit</button>
          </Link>
          <Link to='/user/changePassword'>
            <button className="change-password-btn">Change Password</button>
          </Link>
        </div>
      </div>
    </div>

    <div className="profile-right">
      <h3 className="enrolled-title">Enrolled Courses</h3>
      <div className="enrolled-courses">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div className="course-card-mini" key={index} onClick={()=>gotoCourse(course.id)}>
              <img
                src={`http://localhost:4000/assets/${course.thumbnail}`}
                alt={course.title}
                className="course-thumb-mini"
              />
              <div>
                <h4>{course.title}</h4>
                <p>{course.level}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No enrolled courses.</p>
        )}
      </div>
    </div>
  </div>
  </>
);

  
};

export default ProfilePage;
