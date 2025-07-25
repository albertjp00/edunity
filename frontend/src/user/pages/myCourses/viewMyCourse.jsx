import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './viewMyCourse.css';

const ViewMyCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/user/viewMyCourse?id=${id}`);
      setCourse(res.data.course.course);
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
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    return url;
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-detail-page">
      <h2>{course.title}</h2>

      {course.thumbnail && (
        <img
          src={`http://localhost:4000/assets/${course.thumbnail}`}
          alt="Course Thumbnail"
          className="detail-thumbnail"
        />
      )}

      <p><strong>Description:</strong> {course.description}</p>

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

                {expandedModule === idx && (
                  <div className="module-body" style={{ padding: '10px 20px' }}>
                    {module.lessons.map((lesson, lessonIdx) => (
                      <div
                        key={lessonIdx}
                        className="lesson-item"
                        style={{
                          margin: '10px 0',
                          padding: '10px',
                          background: '#fff',
                          borderRadius: '5px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          cursor: 'pointer',
                          border: selectedLesson === lesson ? '2px solid #1976d2' : '1px solid #ddd'
                        }}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <strong>🎬 {lesson.title}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No modules found.</p>
        )}
      </div>

      {selectedLesson && (
        <div className="lesson-viewer" style={{ marginTop: '30px' }}>
          <h3>{selectedLesson.title}</h3>

          {selectedLesson.videoUrl.includes('youtube.com') || selectedLesson.videoUrl.includes('youtu.be') ? (
            <iframe
              width="100%"
              height="400"
              src={convertToEmbedUrl(selectedLesson.videoUrl)}
              title="Lesson Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ marginTop: '10px' }}
            ></iframe>
          ) : (
            <video
              width="100%"
              height="auto"
              controls
              style={{ marginTop: '10px' }}
            >
              <source src={selectedLesson.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <p style={{ marginTop: '20px' }}>{selectedLesson.content}</p>
        </div>
      )}
    </div>
  );
};

export default ViewMyCourse;
