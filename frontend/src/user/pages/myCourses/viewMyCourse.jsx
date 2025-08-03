import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './viewMyCourse.css';
import Navbar from '../../components/navbar/navbar';

const ViewMyCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/user/viewMyCourse?id=${id}`);
      setCourse(res.data.course.course);
      setCompletedModules(res.data.course.progress?.completedModules || []);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const convertToEmbedUrl = (url) => {
    if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
    return url;
  };

  const markAsCompleted = async (moduleTitle) => {
    try {
      await axios.post('http://localhost:4000/user/updateProgress', {
        courseId: id,
        moduleTitle,
      });
      setCompletedModules((prev) => [...prev, moduleTitle]);
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  if (!course) return <p>Loading...</p>;

  const totalModules = course.modules.length;
  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  return (
    <div>
      <Navbar />
    
    <div className="course-detail-page">
      <h2>{course.title}</h2>

      {course.thumbnail && (
        <img
          src={`http://localhost:4000/assets/${course.thumbnail}`}
          alt="Course Thumbnail"
          className="detail-thumbnail"
        />
      )}

      <div className="progress-bar" style={{ marginBottom: '20px' }}>
        <p><strong>Progress:</strong> {progressPercent}%</p>
        <div style={{ height: '10px', background: '#eee', borderRadius: '5px' }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '10px',
            background: '#4caf50',
            borderRadius: '5px'
          }}></div>
        </div>
      </div>

      {/* Modules */}
      <div className="modules">
        <h3>Modules:</h3>
        {course.modules.map((module, idx) => {
          const isCompleted = completedModules.includes(module.title);
          return (
            <div key={idx} className="module">
              <div
                className="module-header"
                onClick={() => toggleModule(idx)}
                style={{ cursor: 'pointer', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}
              >
                <h4>📘 {module.title || `Module ${idx + 1}`}</h4>
              </div>

              {expandedModule === idx && (
                <div className="module-body" style={{ padding: '10px 20px' }}>
                  {/* Video */}
                  {module.videoUrl.includes('youtube.com') || module.videoUrl.includes('youtu.be') ? (
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

                  <p style={{ marginTop: '10px' }}><strong>📝 Content:</strong> {module.content}</p>

                  {/* Progress Button */}
                  {!isCompleted ? (
                    <button
                      onClick={() => markAsCompleted(module.title)}
                      style={{
                        marginTop: '10px',
                        padding: '8px 16px',
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Mark as Completed
                    </button>
                  ) : (
                    <p style={{ color: 'green', marginTop: '10px' }}>✅ Completed</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};




export default ViewMyCourse;
