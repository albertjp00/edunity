

const sendOtp = require('../../emails/sendOtp')
const {otpStore}  = require("../../utils/otp")
const User = require('../../models/userModel')
const bcrypt = require('bcrypt')


const sendOtpForgotPass = async (email) => {
  try {
    const userExists = await User.findOne({ email });
    console.log('services', userExists);

    if (!userExists) throw new Error("Email doesn't exist");

    let defaultEmail = 'albertjpaul@gmail.com';
    const otp = Math.floor(1000 + Math.random() * 900000).toString();
    await sendOtp(defaultEmail, otp);

    otpStore.set(email, { email, otp, expiresAt: Date.now() + 5 * 60 * 1000 });
    console.log("otpStore ", otpStore);

    return true; 
  } catch (error) {
    console.log(error);
    throw error; 
  }
};


const verifyOtpForgotPass = async (email, enteredOtp) => {
  try {
    console.log('otStore',otpStore);
    
    const stored = otpStore.get(email);

    if (!stored) {
      throw new Error('OTP not found or expired. Please request again.');
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email); 
      throw new Error('OTP has expired. Please request a new one.');
    }

    if (stored.otp !== enteredOtp) {
      throw new Error('Invalid OTP. Please try again.');
    }

    otpStore.delete(email);
    return true;

  } catch (error) {
    console.log(error);
    throw error;
  }
};


const resetPass = async (email,newPassword)=>{
    try {

        console.log(email,newPassword);
        

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        const user = await User.findOneAndUpdate(
        { email },
        { $set: { password: hashedPassword } },
        { new: true }
        );

        return true

    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {sendOtpForgotPass,verifyOtpForgotPass,resetPass}