import React, { useEffect, useState } from 'react'
import './editProfile.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import profilePic from './../../../assets/profilePic.png'
import { useNavigate } from 'react-router-dom'


const ProfileEdit = () => {

    const navigate = useNavigate()

    const [data,setData] = useState({
        name : '',
        email : '',
        expertise : '',
        image : ''
    })

    const [selectedFile,setSelectedFile] = useState(null)

    const handleChange =(e)=>{

        setData({...data,[e.target.name]:e.target.value})
    }

    const handleImage = (e)=>{
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
         const token = localStorage.getItem('instructor')

         console.log(selectedFile);
         
         const formData = new FormData()
         formData.append('name', data.name);
    formData.append('expertise', data.expertise);
    // formData.append('number', data.number);
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }
         
        const response = await axios.put('http://localhost:4000/instructor/editProfile',
            formData,{
            headers:{
                Authorization:`Bearer ${token}`
            },
    })

        if(response.data.success){
            console.log('edit success');
            toast.success("Profile updated",{autoClose:1500})
            navigate('/instructor/profile')
        }
    }

   
    const getProfile  = async  ()=>{
        try {
            const token = localStorage.getItem('instructor')
    const response = await axios.get('http://localhost:4000/instructor/profile',{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    
    console.log(response.data.data);
    setData(response.data.data)
        } catch (error) {
            console.log(error);
            
        }
  }


  useEffect(()=>{
    getProfile()
  },[])


  return (
    <div className="edit">
  <div className="edit-container">
    <h2 className="edit-title">Edit Profile</h2>
    
    <img
                src={selectedFile
                    ? URL.createObjectURL(selectedFile)
                    :data.profileImage 
                    ?`http://localhost:4000/assets/${data.profileImage}`
                    : profilePic
                    
                }
                alt="Profile"
                className="profile-avatar"
              />

    <form onSubmit={handleSubmit}  className="edit-form">
      <div className="edit-inputs">

        <input 
            type='file'
            name='profileImage'
            accept='image/*'
            onChange={handleImage}
        />

        <label>Enter Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Enter Name"
        />

        {/* <label>Enter email</label> */}
        {/* <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter Email"
        /> */}
        
        <label>Enter Number</label>
        <input
          type="text"
          name="number"
          value={data.number}
          onChange={handleChange}
          placeholder="Enter Mobile Number"
        />
      </div>

      <select
      className="input"
      type=""
      name="expertise"
      value={data.expertise}
      placeholder="expertise"
      onChange={handleChange}
      
      >
        <option value="">Select expertise</option>
        <option value="Web Development">Web Development</option>
        <option value="UI/UX Design">UI/UX Design</option>
        <option value="Data Science">Data Science</option>
        <option value="Machine Learning">Machine Learning</option>
        <option value="Cybersecurity">Cybersecurity</option>
        <option value="Marketing">Marketing</option>
      </select>

      <div className="submit-btn">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  </div>
</div>

  )
}

export default ProfileEdit
