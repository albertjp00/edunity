const nodemailer = require("nodemailer");

const dotenv = require('dotenv');
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOtp = async (to, otp) => {
  await transporter.sendMail({
    from: `"Connected" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`
  });
};

module.exports = sendOtp;
