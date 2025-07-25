import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/instructor/courseDetails?id=${id}`);
      setCourse(res.data.course);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/instructor/editCourse/${id}`);
  };

  const convertToEmbedUrl = (url) => {
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    return url;
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const toggleModule = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-detail-page">
      <div className="course-title">
        <h2>{course.title}</h2>
        <button onClick={() => handleEdit(course._id)} className="edit-button">
          ✏️ Edit Course
        </button>
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

      <div className="course-highlights">
            <div className="highlight-row">
                
                <div className="highlight-item">
                <p>🧑‍🎓 <strong>Beginner level</strong></p>
                <span>No prior experience required</span>
                </div>
                <div className="highlight-item">
                <p>⏱️ <strong>Estimated Time</strong></p>
                <span> 12 hours</span>
                </div>
                <div className="highlight-item">
                <p>🎯 <strong>Learn at your own pace</strong></p>
                </div>
            </div>
        </div>

      {/* Skills Box */}
      {course.skills && course.skills.length > 0 && (
        <div className="skills-box">
          <p className="skills-title">Skills you'll gain</p>
          <div className="skills-list">
            {course.skills.map((skill, index) => (
              <button key={index} className="skill-button">{skill}</button>
            ))}
          </div>
        </div>
      )}

      {/* Modules */}
      <div className="modules">
        <h3>Modules:</h3>
        {course.modules.length > 0 ? (
          <div className="modules-list">
            {course.modules.map((module, idx) => (
              <div key={idx} className="module">
                <div
                  className="module-header"
                  onClick={() => toggleModule(idx)}
                  style={{ cursor: 'pointer', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}
                >
                  <h4>📘 {module.title || `Module ${idx + 1}`}</h4>
                </div>
                {expandedIndex === idx && (
                  <div className="module-body" style={{ padding: '10px 20px' }}>
                    <div>
                      <strong>🎥 Video:</strong>
                      {module.videoUrl && (module.videoUrl.includes('youtube.com') || module.videoUrl.includes('youtu.be')) ? (
                        <iframe
                          width="100%"
                          height="315"
                          src={convertToEmbedUrl(module.videoUrl)}
                          title="Lesson Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ marginTop: '10px' }}
                        ></iframe>
                      ) : (
                        <video width="100%" height="auto" controls style={{ marginTop: '10px' }}>
                          <source src={module.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                    <p><strong>📝 Content:</strong> {module.content}</p>
                  </div>
                )}
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
