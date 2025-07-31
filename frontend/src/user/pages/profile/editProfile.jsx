import React, { useEffect, useState } from 'react'
import './editProfile.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import profilePic from './../../../assets/profilePic.png'
import { useNavigate } from 'react-router-dom'


const EditProfile = () => {

    const navigate = useNavigate()

  const [data, setData] = useState({
  name: '',
  email: '',
  phone: '',
  bio: '',
  location: '',
  dob: '',
  gender: '',
  profileImage: '',
});

  const [selectedFile, setSelectedFile] = useState(null);

  const validate = ()=>{

    const {name,number} = data

    if(!name.trim()){
      toast.error('Please fill all the fileds',{autoClose:1500})
      return false
    }



    // if(!number.trim()){
    //     setMessage('please fill all the fileds')
    // }

    

    return true

  }

  const handleChange = (e) => {
    console.log(data);
    
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validate()){
        return 
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('bio', data.bio);
    formData.append('location', data.location);
    formData.append('dob', data.dob);
    formData.append('gender', data.gender);

    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }

    try {
      const response = await axios.put(
        'http://localhost:4000/user/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success('Profile updated', { autoClose: 1500 });
        navigate('/user/profile')
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    }
  };

   
    const getProfile  = async  ()=>{
        const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:4000/user/profile',{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    
    console.log(response.data.data);
    setData(response.data.data)
  }


  useEffect(()=>{
    getProfile()
  },[])


  return (
    <div className="edit">
  <div className="edit-container">
    <h2 className="edit-title">Edit Profile</h2>
    <img
          src={
            selectedFile
              ? URL.createObjectURL(selectedFile)
              : data.profileImage
              ? `http://localhost:4000/assets/${data.profileImage}`
              : profilePic
          }
          alt="Profile"
          className="profile-avatar"
        />
    
    <form onSubmit={handleSubmit}  className="edit-form">
      <div className="edit-inputs">
        <label>Upload Profile Image:</label>
    <input
      type="file"
      name="profileImage"
      accept="image/*"
      onChange={handleImageChange}
    />
    
    <label>Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Enter Name"
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="Enter Phone Number"
        />

        <label>Bio</label>
        <textarea
          name="bio"
          value={data.bio}
          onChange={handleChange}
          placeholder="Write a short bio"
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={data.location}
          onChange={handleChange}
          placeholder="Enter Location"
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={data.dob}
          onChange={handleChange}
        />

        <label>Gender</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        </div>
      <div className="submit-btn">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  </div>
</div>

  )
}

export default EditProfile
