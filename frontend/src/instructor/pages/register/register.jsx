import { useState } from "react";
import axios from "axios";
import './register.css'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";


const InstructorRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
    expertise : ""
  });


  const navigate = useNavigate()

  const [message, setMessage] = useState("");

  const validate = ()=>{

    const {name,email,password,confirmPassword} = formData

    if(!name.trim()){
      setMessage('Please fill all the fileds')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) { 
      setMessage("Please enter a valid email");
      return;
    }

    if (!password.trim() || password.length < 6) {
    setMessage("Password must be at least 6 characters");
    return;
    }

    if(!confirmPassword.trim() ||  password != confirmPassword){
      setMessage("Passwords do not match")
      return
    }

    return true

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()){
      return
    }

    try {

      localStorage.setItem('emailInstructor',formData.email)

      const res = await axios.post("http://localhost:4000/instructor/register", formData);
      // setMessage("User registered successfully");

      if(res.data.success){
        console.log('succes',res);
        
        navigate('/instructor/otpVerify')
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.error(error);
      setMessage("Registration failed");
    }
  };

 return (
  <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Instructor Register</h2>

      <input
        className="input"
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={formData.name}
      />

      <input
        className="input"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
      />

      <input
        className="input"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
      />

      <input 
      className="input"
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      onChange={handleChange}
      
      />

      <select
      className="input"
      type=""
      name="expertise"
      value={formData.expertise}
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

      <button type="submit" className="button">Register</button>
      {message && <p className="message">{message}</p>}
    </form>
  </div>
);

};

export default InstructorRegister;
