import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import axios from 'axios';
import './myCourses.css'
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate()

  const token = localStorage.getItem('token');

  const fetchCourses = async () => {
    try {
      const res = await api.get(`/user/myCourses?id=${token}`,{
        headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      if (res.data.success) {
        setCourses(res.data.courses);
        console.log('courses',res.data);
        
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const selectCourse = (id)=>{
    console.log('coursessss',id,courses);
    
    navigate(`/user/viewMyCourse/${id}`)

  }

  useEffect(() => {
    fetchCourses();
  }, []);

 return (
  <div>
    <Navbar />
    
    <div className="course-container">
      <h2>My Courses</h2>
      {courses.length === 0 ? (
        <p>No courses yet.</p>
      ) : (
        <div className="course-list">
          {courses.map(course => (
            <div key={course._id} className="course-card" onClick={()=>selectCourse(course.id)}>
              {course.thumbnail && (
                <img
                  src={`http://localhost:4000/assets/${course.thumbnail}`}
                  alt="Thumbnail"
                  className="course-thumbnail"
                />
              )}

              <div className="course-details">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <p className="course-price">₹{course.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);


};

export default MyCourses;
