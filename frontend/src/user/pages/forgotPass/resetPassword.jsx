import React, { useState } from 'react';
import axios from 'axios';
import './resetPassword.css'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate()

  const token = localStorage.getItem('token');

  const validate = () => {
  

  if (!newPassword.trim()) {
    toast.error('New password is required', { autoClose: 1500 });
    return false;
  }

  if (newPassword.length < 6) {
    toast.error('New password must be at least 6 characters', { autoClose: 1500 });
    return false;
  }

  if (!confirmPassword.trim()) {
    toast.error('Please confirm your new password', { autoClose: 1500 });
    return false;
  }

  if (newPassword !== confirmPassword) {
    toast.error('Passwords do not match', { autoClose: 1500 });
    return false;
  }

  return true;
};

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if(!validate()){
        return 
    }

    try {

        const email = localStorage.getItem('forgotEmail')

      const response = await axios.put(
        'http://localhost:4000/user/resetPassword',
        { email,  newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.data.success){
        toast.success('Password updated successfully!',{autoClose:1500})

      setNewPassword('');
      setConfirmPassword('');
        localStorage.removeItem('forgotEmail')
        navigate('/user/login')
      
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };


  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleChangePassword}>
        <h2>Reset Password</h2>

        
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} 
          
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          
        />

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
