import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './viewMyCourse.css';

import YouTube from 'react-youtube';

const YouTubePlayer = ({ url }) => {
  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(url);

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
    },
  };

  return (
    <>
      {videoId ? (
        <YouTube videoId={videoId} opts={opts} />
      ) : (
        <p>Invalid or unsupported video URL</p>
      )}
    </>
  );
};


const ViewMyCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

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

  if (!course) return <p>Loading...</p>;

  const currentModule = course.modules[currentModuleIndex];
  const currentLesson = currentModule.lessons[currentLessonIndex];

const handleNextLesson = () => {
  console.log('next');
  
  const currentModule = course.modules[currentModuleIndex];

  if (currentLessonIndex < currentModule.lessons.length - 1) {
    setCurrentLessonIndex(prev => prev + 1);

  } else if (currentModuleIndex < course.modules.length - 1) {

    setCurrentModuleIndex(prev => prev + 1);
    setCurrentLessonIndex(0);
  }
};

const handlePrevLesson = () => {
  if (currentLessonIndex > 0) {
    setCurrentLessonIndex(prev => prev - 1);

  } else if (currentModuleIndex > 0) {

    const prevModuleIndex = currentModuleIndex - 1;
    const lastLessonIndex = course.modules[prevModuleIndex].lessons.length - 1;
    setCurrentModuleIndex(prevModuleIndex);
    setCurrentLessonIndex(lastLessonIndex);

  }
};


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

      <div className="module-selector">
        <h3>Select Module:</h3>
        {course.modules.map((module, idx) => (
          <button
            key={idx}
            className={`module-button ${currentModuleIndex === idx ? 'active' : ''}`}
            onClick={() => {
              setCurrentModuleIndex(idx);
              setCurrentLessonIndex(0);
            }}
          >
            {module.title || `Module ${idx + 1}`}
          </button>
        ))}
      </div>

      <div className="lesson-viewer">
        <h3>{currentLesson?.title}</h3>

        {currentLesson?.videoUrl && (
          <div className="video-wrapper">
            <YouTubePlayer url={currentLesson.videoUrl} />
          </div>
        )}


        <p>{currentLesson?.content}</p>

        <div className="lesson-nav">
          <button
  onClick={handleNextLesson}
  disabled={
    currentModuleIndex === course.modules.length - 1 &&
    currentLessonIndex === course.modules[currentModuleIndex].lessons.length - 1
  }
>
  {console.log(
    "Disabled condition:",
    currentModuleIndex === course.modules.length - 1 &&
      currentLessonIndex === course.modules[currentModuleIndex].lessons.length - 1
  )}
  Next Lesson ▶
</button>


        </div>

      </div>
    </div>
  );
};

export default ViewMyCourse;
