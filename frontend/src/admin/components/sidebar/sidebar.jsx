import React from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
      <div className="sidebar">
                    <ul>
                        
                        <NavLink to='/admin/dashboard' className='sidebar-option'>
                            <p>Dashboard</p> 

                        </NavLink>

                        
                        <NavLink to='/admin/users' className='sidebar-option'>
                            <p>Users</p> 

                        </NavLink>


                        <NavLink to='/admin/instructors' className='sidebar-option'>
                            <p>Instructors</p> 

                        </NavLink>
                    </ul>
                    
                    
                </div>
  )
}

export default Sidebar
