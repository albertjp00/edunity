import React, { useState } from 'react'
import './kyc.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom'

const KycVerification = () => {

    const navigate = useNavigate()

    const [file,setFile] = useState({
        idProof : null,
        addressProof : null 
    })

    const validate = ()=>{

         if (!file.idProof) {
    toast.error("Please upload ID proof", { autoClose: 1500 });
    return false;
    }

    if (!file.addressProof) {
        toast.error("Please upload address proof", { autoClose: 1500 });
        return false;
    }

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!validTypes.includes(file.idProof?.type) || !validTypes.includes(file.addressProof?.type)) {
    toast.error("Only JPG, PNG, or PDF files are allowed", { autoClose: 1500 });
    return false;
    }
    return true
    }

    const handleIdChange = (e)=>{
        setFile((prev)=>({
            ...prev,idProof:e.target.files[0]
        }))
    }

    const handleAddressChange = (e)=>{
        setFile((prev)=>({
            ...prev,addressProof:e.target.files[0]
        }))
    }

    

    const handleKYCSubmit = async (e) => {
  e.preventDefault();

  if(!validate()){
    return 
  }

  const formData = new FormData();
  formData.append('idProof', file.idProof);
  formData.append('addressProof', file.addressProof);

  const token = localStorage.getItem('instructor');

  try {
    const response = await axios.post(
      'http://localhost:4000/instructor/kycSubmit',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (response.data.success) {
      toast.success("KYC submitted successfully!");
      navigate('/instructor/profile')
    }
  } catch (error) {
    console.error("KYC submission failed:", error);
    toast.error("Something went wrong!");
  }
};

  return (

    <div className="kyc-container">
  <h2>Upload KYC Documents</h2>
  <form onSubmit={handleKYCSubmit} className="kyc-form" encType="multipart/form-data">
    <label>ID Proof</label>
    <input type="file" name="idProof" onChange={handleIdChange} />

    <label>Address Proof</label> 
    <input type="file" name="addressProof" onChange={handleAddressChange}  />

    <button type="submit">Submit KYC</button>
  </form>
</div>

  )
}

export default KycVerification
