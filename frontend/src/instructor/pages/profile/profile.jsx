import React, { useEffect, useState } from 'react'
import profilePic from './../../../assets/profilePic.png'
import { Link, useNavigate } from 'react-router-dom'
import './profile.css'
import axios from 'axios'
import instructorApi from '../../../api/instructorApi'

const Profile = () => {
  const [user, setUser] = useState({})
  const [courses, setCourses] = useState([])

  const navigate = useNavigate()
  
  const token = localStorage.getItem('instructor')

  const getProfile = async () => {
    const response = await instructorApi.get('/instructor/profile')
    setUser(response.data.data)
  }

  const getCourses = async () => {
    const res = await axios.get(`http://localhost:4000/instructor/getCourse?id=${token}`)
    if (res.data.success) {
      console.log(res);
      
      setCourses(res.data.course)
    }
  }

  const courseDetails = (id)=>{
    navigate(`/instructor/courseDetails/${id}`)
  }

  useEffect(() => {
    getProfile()
    getCourses()
  }, [])

  return (
    <div className="profile-container1">
      {/* LEFT */}
      <div className="profile-left">
        <div className="profile-card1">
          <div className="user-name-card">
            <img
              src={user.profileImage ? `http://localhost:4000/assets/${user.profileImage}` : profilePic}
              alt="Profile"
              className="profile-avatar"
            />
            <div>
              <h2>{user.name}</h2>
              <h5>Email: {user.email}</h5>
              <Link to="/instructor/editProfile">
                <button className="edit-btn">Edit</button>
              </Link>
            </div>
          </div>

          <div className="about-me">
            <h4>Bio</h4>
            <p>{user.bio}</p>
          </div>

          <div className="user-details-box">
            <p><i className="fas fa-user"></i> <strong>Role:</strong> Instructor</p>
            <p><i className="fas fa-certificate"></i> <strong>Expertise:</strong> {user.expertise}</p>
            <p>
              <i className="fas fa-check-circle"></i> <strong>KYC:</strong>
              {user.KYCstatus === 'verified' ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}> Verified</span>
              ) : user.KYCstatus === 'pending' ? (
                <span style={{ color: 'orange', fontWeight: 'bold' }}> Pending</span>
              ) : user.KYCstatus === 'rejected' ? (
                <>
                  <span style={{ color: 'red', fontWeight: 'bold' }}> Rejected</span>
                  <Link to="/instructor/kyc" style={{ marginLeft: '10px' }}>
                    <button className="kyc-button">Re-Submit</button>
                  </Link>
                </>
              ) : (
                <Link to="/instructor/kyc">
                  <button className="kyc-button">Verify</button>
                </Link>
              )}
            </p>

          </div>

          <div className="btn-edit">
            <Link to="/instrcutor/passwordChange">
              <button className="pass-btn">Change Password</button>
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="profile-right">
        <div className="education-box">
          <h3>Education</h3>
          <p>{user.education || 'Not added yet'}</p>

          <h3>Experience</h3>
          <p>{user.work}</p>
        </div>

        <div className="enrolled-courses" >
          <h3>Courses You Teach</h3>
          {courses.length === 0 ? (
            <p>No courses yet.</p>
          ) : (
            courses.map(course => (
              <div className="course-card-mini" key={course._id} onClick={()=>courseDetails(course._id)}>
                <img
                  src={`http://localhost:4000/assets/${course.thumbnail}`}
                  alt={course.title}
                  className="course-thumb-mini"
                />
                <div>
                  <h4>{course.title}</h4>
                  <p>{course.level} | ₹{course.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
