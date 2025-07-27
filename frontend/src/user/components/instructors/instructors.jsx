import React from 'react'
import { useEffect } from 'react'
import api from '../../../api/axios'
import { useState } from 'react'
import './instructor.css'


const InstructorsUsersSide = () => {
    
    const [instructors,setInstructor] = useState([])
    const [showAll, setShowAll] = useState(false);

    const getInstructor = async ()=>{
        const response = await api.get('/user/getInstructors')
        setInstructor(response.data.instructor)
    }

    useEffect(()=>{
        getInstructor()
    },[])

    useEffect(()=>{
        console.log(instructors);
        
    },[instructors])

 const visibleInstructors = showAll ? instructors : instructors.slice(0, 3);

  return (
    <div className="instructor-section">
      <h2>Meet the Instructors</h2>

      <div className="instructor-grid">
        {visibleInstructors.map((inst, index) => (
          <div className="instructor-card" key={index}>
            <img
              src={`http://localhost:4000/assets/${inst.profileImage}`} // adjust based on your backend
              alt={inst.name}
              className="instructor-img"
            />
            <div className="instructor-info">
              <h3>{inst.name}</h3>
              <p>{inst.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {instructors.length > 3 && (
        <button className="show-more-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default InstructorsUsersSide
