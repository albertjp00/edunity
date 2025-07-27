import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import axios from 'axios';
import './courses.css';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [skills,setSkills] = useState([])
  const [levelFilter, setLevelFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const navigate = useNavigate();

  const fetchCourses = async (page = 1) => {
    try {
        const res = await axios.get(`http://localhost:4000/user/getCourses?page=${page}&limit=6`);
        if (res.data.success) {
        setCourses(res.data.course);
        setSkills(res.data.skills);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
        }
    } catch (err) {
        console.error("Error fetching courses:", err);
    }
    };


  useEffect(() => {
    fetchCourses();
  }, []);

  const selectCourse = (id) => {
    navigate(`/user/courseDetails/${id}`);
  };


  const filteredCourses = courses.filter((course) => {
  const matchesLevel = levelFilter ? course.level === levelFilter : true;
  const matchesSkill = skillFilter
    ? course.skills?.includes(skillFilter)
    : true;
  const matchesSearch = searchQuery
    ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    : true;

  return matchesLevel && matchesSkill && matchesSearch;
});





  return (
    <div className="course-container">
      <h2>Available Courses</h2>
            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>



        <div className="filter-controls">
        <div className="filter-group">
            <span>Level:</span>
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
                key={level}
                className={`filter-btn ${levelFilter === level ? 'active' : ''}`}
                onClick={() =>
                setLevelFilter(levelFilter === level ? '' : level)
                }
            >
                {level}
            </button>
            ))}
        </div>

        <div className="filter-group">
            <span>Skill:</span>
            {skills.map((skill) => (
            <button
                key={skill}
                className={`filter-btn ${skillFilter === skill ? 'active' : ''}`}
                onClick={() =>
                setSkillFilter(skillFilter === skill ? '' : skill)
                }
            >
                {skill}
            </button>
            ))}
        </div>
    </div>


      {filteredCourses.length === 0 ? (
        <p className="no-courses">No matching courses found.</p>
      ) : (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="course-card"
              onClick={() => selectCourse(course._id)}
            >
              <div className="thumbnail-wrapper">
                <img
                  src={`http://localhost:4000/assets/${course.thumbnail}`}
                  alt="Course Thumbnail"
                  className="course-thumbnail"
                />
              </div>
              <div className="course-info">
                <h3>{course.title}</h3>
                <p className="description">{course.description}</p>
                <div className="bottom-row">
                  <span className="price">₹{course.price}</span>
                  <button className="view-btn">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-controls">
        <button
            disabled={currentPage === 1}
            onClick={() => fetchCourses(currentPage - 1)}
        >
            Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
            <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => fetchCourses(i + 1)}
            >
            {i + 1}
            </button>
        ))}

        <button
            disabled={currentPage === totalPages}
            onClick={() => fetchCourses(currentPage + 1)}
        >
            Next
        </button>
        </div>

    </div>
  );
};

export default Courses;
