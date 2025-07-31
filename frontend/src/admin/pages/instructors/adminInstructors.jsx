import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './instructors.css'
import { Link } from 'react-router-dom'

const InstructorsAdmin = () => {

  const [instructor,setInstructor] = useState([])

  const getInstructors = async ()=>{

    const response = await axios.get('http://localhost:4000/admin/get-instructors')

    console.log(response.data.data);
    setInstructor(response.data.data)
    
  }

  useEffect(()=>{
    getInstructors()
  },[])
  return (
    <div className='instructor-list'>
      <h2>Instructors List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>picture</th>
            <th>KYC</th>
          </tr>

        </thead>
        <tbody>
          {instructor.map((user,index)=> (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.profileImage && (
                  <img
                    src={`http://localhost:4000/assets/${user.profileImage}`}
                    alt={user.name}
                    width="40"
                    height="40"
                  />
                )}
              </td>
              <td>
                {user.KYCstatus === "notApplied" ? (
                  <span className="no-kyc">No KYC Submitted</span>
                ) : user.KYCstatus === "verified" ? (
                  <button className="btn-verified">Verified</button>
                ) : user.KYCstatus === "pending" ? (
                  <Link to={`/admin/viewKyc/${user._id}`}>
                    <button className="verify-btn">Verify</button>
                  </Link>
                ) : user.KYCstatus === "rejected" ? (
                  <span className="kyc-rejected">Rejected</span>
                ) : null}
              </td>

            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default InstructorsAdmin
