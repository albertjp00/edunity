import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);


  
  const navigate = useNavigate()

  const fetchCourse = async () => {
    try {
    
        console.log('fetching',id);
        
      const res = await axios.get(`http://localhost:4000/instructor/courseDetails?id=${id}`)

      setCourse(res.data.course);
      console.log(course);
      
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  const handleEdit = (id)=>{
        navigate(`/instructor/editCourse/${id}`)
  }

  useEffect(() => {
    fetchCourse();
    if (course) {
    console.log("Loaded course:", course);
  }
  }, []);

  if(!course) return <p>loading</p>

  return (
  <div className="course-detail-page">
    <div className="course-title">
      <h2>{course.title}</h2>

      <div className="edit-buttons">
        <button onClick={() => handleEdit(course._id)} className="edit-button">
          Edit Course
        </button>
      </div>
    </div>

    {course.thumbnail && (
      <img
        src={`http://localhost:4000/assets/${course.thumbnail}`}
        alt="Course Thumbnail"
        className="detail-thumbnail"
      />
    )}

    <p><strong>Description:</strong> {course.description}</p>
    <p><strong>Price:</strong> ₹{course.price}</p>

    <div className="modules">
      <h3>Modules:</h3>
      {course.modules.length > 0 ? (
        <div className="modules-list">
          {course.modules.map((module, idx) => (
            <div key={idx} className="module">
              <h4>📘 {module.title || `Module ${idx + 1}`}</h4>
              <p><strong>🎥 Video:</strong> {module.videoUrl}</p>
              <p><strong>📝 Content:</strong> {module.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No modules found.</p>
      )}
    </div>
  </div>
);

};

export default CourseDetails;
