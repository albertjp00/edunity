import React from 'react'
import Navbar from '../../components/navbar/navbar'
import './home.css'

import { useState } from 'react'
import Courses from '../../components/courses/courses'

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />

      <Courses />
    </div>
  )
}

export default Home
