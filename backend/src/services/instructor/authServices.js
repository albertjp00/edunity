const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
const { generateToken } = require("../../utils/jwt");
const jwt = require("jsonwebtoken");
const Instructor = require('../../models/instructorModel')



//register instructor -----------

const generateOTP = require("../../utils/otp");
const sendOtp = require("../../emails/sendOtp");
const {otpStore} = require("../../utils/otp");

const registerRequest = async ({ name, email, password , expertise }) => {
  try {
    console.log('registerRequwst ', name,email,password,expertise);
    
    const exists = await Instructor.findOne({ email });
    console.log("request",exists);
    
  if (exists) return {success:false,message:"Account already exists"}

    let defaultEmail = 'albertjpaul@gmail.com'
  const otp = Math.floor(1000 + Math.random() * 900000).toString()
  await sendOtp(defaultEmail, otp);

  // Store user data and OTP in memory (can be Redis or DB)
  otpStore.set(email, { name, email, password , expertise, otp, expiresAt: Date.now() +  60 * 1000 });
  console.log("otpStoreInstructor ",otpStore);
  
  return {success:true, message: "OTP sent to your email"};

  } catch (error) {
    console.log(error);
  }
};


const resendOtp = async ({email})=>{
    try {
        console.log('resend Otp');
        
        let defaultEmail = 'albertjpaul@gmail.com'
  const otp = Math.floor(1000 + Math.random() * 900000).toString()
  await sendOtp(defaultEmail, otp);

  const record = otpStore.get(email);
    if (!record) {
      return { success: false, message: "No OTP session found. Please register again." };
    }

  otpStore.set(email, { ...record, otp,  expiresAt: Date.now() +  60 * 1000 });
  console.log("otpStoreInstructor ",otpStore);
  
  return {success:true, message: "OTP resend"};
    } catch (error) {
        console.log(error);
        
    }
}

const verifyOtp = async ({ email, otp }) => {
    try {
        console.log("verifying instructor otp");
    console.log("store",otpStore);
    console.log('instructorEmail',email);
    
  const record = otpStore.get(email);
  console.log('record',record);
  
  if (!record) throw new Error("OTP expired or invalid");

  if (record.otp !== otp) throw new Error("Incorrect OTP");

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    throw new Error("OTP expired");
  }

  const hashedPassword = await bcrypt.hash(record.password, 10);
  const user = await Instructor.create({
    name: record.name,
    email,
    password: hashedPassword,
    expertise : record.expertise
  });

  otpStore.delete(email);
  let token = jwt.sign({ id: user._id }, 'secret key', {
      expiresIn: "1d"
    });
    return {user,token}
    } catch (error) {
        console.log(error);
        
    }
};




// login ---------
const login = async ({ email, password }) => {
    console.log('auth service  instructor');
    
  const instructor = await Instructor.findOne({ email });
  console.log('instructor',instructor);
  
  
  if (!instructor) throw new Error("Invalid email");

  const isMatch = await bcrypt.compare(password, instructor.password);
  if (!isMatch) throw new Error("Invalid password");

  let token = jwt.sign({ id: instructor._id }, 'secret key', {
      expiresIn: "1d"
    });
    return {instructor,token}
};




module.exports = { registerRequest, verifyOtp , resendOtp , login };



