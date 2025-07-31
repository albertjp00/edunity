import React from 'react'
import Dashboard from '../dashboard/dashboard'
import Navbar from '../../components/navbar/navbar'
import { useState } from 'react'
import './home.css'
import InstructorsAdmin from '../instructors/adminInstructors'
import UsersAdmin from '../users/AdminUsers'
import Sidebar from '../../components/sidebar/sidebar'
import { Route, Routes } from 'react-router-dom'

const AdminHome = () => {

    const [select,setSelect] = useState('dashboard')
    
  return (
    <div className='home'>
        
        <Navbar />
            <div className='admin-container'>
                <Sidebar />

                <div className="a">

                    <Routes>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='users' element={<UsersAdmin />}/>
                        <Route path='instructors' element={<InstructorsAdmin />}/>
                    </Routes>
                </div>
                
                {/* <div className="main-content">
                    
                    {select == 'dashboard' && <Dashboard />}
                    {select == 'users' && <UsersAdmin />}
                    {select == 'instructors' && <InstructorsAdmin />}
                </div> */}
        
            </div>
    </div>
  )
}

export default AdminHome
