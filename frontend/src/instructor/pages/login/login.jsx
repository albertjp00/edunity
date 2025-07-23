import axios from 'axios'
import React, { useState,useEffect } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'

const InstructorLogin = () => {

  const navigate = useNavigate()
  const [value, setValue] = useState({
    email: '',
    password: ''
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault() // prevent page reload
    console.log("Ui ",value)

    try {
      const response = await axios.post('http://localhost:4000/instructor/login',
        value
    )

    

      if (response.status === 200) {
        localStorage.setItem('instructor',response.data.token)
        console.log("Login successful:", response.data)
        navigate('/instructor/home')
      } else {
        console.log("Login failed")
      }
    } catch (error) {
      console.error("Error logging in:", error)
    }

    
  }

  useEffect(()=>{
      console.log('useEffect');
      
      let token = localStorage.getItem('instructor')
      if(token){
        navigate('/instructor/home')
      }
    },[])

  return (
    <div className='login'>
      <div className="login-container">

      
      <h2>Instructor Login</h2>
        <form onSubmit={onSubmitHandler} className='login-form'>
          <input
            className='inputs'
            type='text'
            name='email'
            placeholder='Enter email'
            value={value.email}
            onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}

          />

            
          <input
            className='inputs'
            type='password'
            name='password'
            placeholder='Enter Password'
            value={value.password}
            onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}

          />

          
          <div className="button-container">
            <button type='submit' className='btn'>Login</button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default InstructorLogin

