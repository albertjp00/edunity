import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import './login.css'

const AdminLogin = () => {

    const [admin,setAdmin] = useState({
        email : '',
        password : ''
    })

    const navigate = useNavigate()

    const submitHandler = async (e) =>{
        e.preventDefault()
        console.log("handle");
        

        const response = await axios.post('http://localhost:4000/admin/login',
            admin
        )
        if(response.data.success){
            console.log(response);
            localStorage.setItem('admin',response.data.user.adminToken)
            
            navigate('/admin')
        }else{
            toast.error(response.data.message)
        }

    }

    
  return (
    <div className='login'>
        <h2>Login </h2>
      <form onSubmit={submitHandler}>
        <div className='login-input'>
        <input  
        type='text'
        name='email'
        placeholder='Enter Email'
        value={admin.email}
        onChange={(e)=>setAdmin({...admin,[e.target.name]:e.target.value})}
        />
        
        <input 
        type='password'
        name='password'
        placeholder='Enter Password'
        value={admin.password}
        onChange={(e)=>setAdmin({...admin,[e.target.name]:e.target.value})}
        />

        <button type='submit'>submit</button>
        </div>


        

      </form>
    </div>
  )
}

export default AdminLogin
