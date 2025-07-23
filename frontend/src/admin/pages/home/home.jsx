import React from 'react'
import Dashboard from '../dashboard/dashboard'
import Navbar from '../../components/navbar/navbar'
import { useState } from 'react'
import './home.css'
import InstructorsAdmin from '../instructors/adminInstructors'
import UsersAdmin from '../users/AdminUsers'

const AdminHome = () => {

    const [select,setSelect] = useState('dashboard')
    
  return (
    <div className='home'>
        
        <Navbar />
            <div className='admin-container'>
                <div className="sidebar">
                    <ul>
                        <li onClick={()=>setSelect('dashboard')}>Dashboard</li>
                        <li onClick={()=>setSelect('users')}>Users</li>
                        <li onClick={()=>setSelect('instructors')}>Instructors</li>
                    </ul>
                    
                    
                </div>
                
                <div className="main-content">
                    {select == 'dashboard' && <Dashboard />}
                    {select == 'users' && <UsersAdmin />}
                    {select == 'instructors' && <InstructorsAdmin />}
                </div>
        
            </div>
    </div>
  )
}

export default AdminHome
