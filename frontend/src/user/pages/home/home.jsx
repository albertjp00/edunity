import React from 'react'
import Navbar from '../../components/navbar/navbar'
import './home.css'
import banner from '../../../assets/banner.jpeg'

import { useState } from 'react'
import Courses from '../../components/courses/courses'
import InstructorsUsersSide from '../../components/instructors/instructors'

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="banner-container">
        <img
          src={banner} // or use import if from src/assets: import banner from '../../assets/banner.jpg'
          alt="E-learning Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Learn Anytime, Anywhere</h1>
          <p>Empowering knowledge through modern education</p>
        </div>
      </div>

      <Courses />
      <InstructorsUsersSide />
    </div>
  )
}

export default Home
