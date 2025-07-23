import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './verifyKyc.css'
import { toast } from 'react-toastify'

const ViewKYC = () => {
  const { id } = useParams()
  const [kyc, setKyc] = useState({})

  const navigate = useNavigate()

  const fetchKyc = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/admin/get-kyc/${id}`)
      console.log(res.data.details);
      
      setKyc(res.data.details)
      console.log('kyc',kyc);
      
    } catch (err) {
      console.log(err)
      toast.error('Failed to load KYC details')
    }
  }


  const verifyKyc = async () => {
    try {
        console.log(kyc.instructorId);
        
      const res = await axios.put(`http://localhost:4000/admin/verify-kyc/${kyc.instructorId}`)
      if (res.data.success) {
        toast.success("KYC Verified")
        navigate('/admin/home')
      }
    } catch (err) {
      console.log(err)
      toast.error("Verification failed")
    }
  }

  const rejectKyc = async () => {
    try {
        console.log(kyc.instructorId);
        
      const res = await axios.put(`http://localhost:4000/admin/reject-kyc/${kyc.instructorId}`)
      if (res.data.success) {
        toast.success("KYC Rejected")
        navigate('/admin/home')
      }
    } catch (err) {
      console.log(err)
      toast.error("Verification failed")
    }
  }

  useEffect(() => {
    fetchKyc()
  }, [])

//   if (!kyc) return <p>Loading KYC details...</p>

  return (
  <div className='kyc-view'>
    <h2>KYC Details</h2>

    <p><strong>ID Proof:</strong></p>
    <a
      href={`http://localhost:4000/assets/${kyc.idProof}`}
      target="_blank"
      rel="noopener noreferrer"
      className="kyc-link"
    >
      View ID Proof
    </a>

    <p><strong>Address Proof:</strong></p>
    <a
      href={`http://localhost:4000/assets/${kyc.addressProof}`}
      target="_blank"
      rel="noopener noreferrer"
      className="kyc-link"
    >
      View Address Proof
    </a>

    <br />
    <button onClick={verifyKyc} className='verify-btn'>Verify KYC</button>
    <button onClick={rejectKyc} className='verify-btn'>Reject</button>
  </div>
)

}

export default ViewKYC
