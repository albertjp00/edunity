const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
const { generateToken } = require("../../utils/jwt");
const jwt = require("jsonwebtoken");



//register user -----------

const generateOTP = require("../../utils/otp");
const sendOtp = require("../../emails/sendOtp");
const {otpStore}  = require("../../utils/otp");




const registerRequest = async ({ name, email, password }) => {
  try {
    const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Email already registered");
    let defaultEmail = 'albertjpaul@gmail.com'
  const otp = Math.floor(1000 + Math.random() * 900000).toString()
  await sendOtp(defaultEmail, otp);

  otpStore.set(email, { name, email, password, otp, expiresAt: Date.now() + 5 * 60 * 1000 });
  console.log("otpStore ",otpStore);
  

  return {success:true, message: "OTP sent to your email" };
  } catch (error) {
    console.log(error);
  }
};

const verifyOtpAndRegister = async ({ email, otp }) => {
    try {
        console.log("verifying");
    console.log("store",otpStore);
    
  const record = otpStore.get(email);
  if (!record) throw new Error("OTP expired or invalid");

  if (record.otp !== otp) throw new Error("Incorrect OTP");

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    throw new Error("OTP expired");
  }

  const hashedPassword = await bcrypt.hash(record.password, 10);
  const user = await User.create({
    name: record.name,
    email,
    password: hashedPassword
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




//login ---------
const login = async ({ email, password }) => {
    console.log('auth service ');
    
  const user = await User.findOne({ email });
  
  if (!user) throw new Error("Invalid email");

  if (user.blocked) {
    return {user}
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  
  if (!isMatch) throw new Error("Invalid password");

  

  let token = jwt.sign({ id: user._id }, 'secret key', {
      expiresIn: "1d"
    });
    return {user,token}
};




module.exports = { registerRequest, verifyOtpAndRegister , login };



