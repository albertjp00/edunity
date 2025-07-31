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


const kycRejectMail = async (email) => {
  try {
    await transporter.sendMail({
      from: `"Edunity" <${process.env.EMAIL_USER}>`,
      to: email, // 🛠️ fixed 'email' field to 'to'
      subject: "KYC Rejected - Edunity",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: red;">KYC Verification Rejected</h2>
          <p>Dear Instructor,</p>
          <p>We regret to inform you that your KYC verification has been rejected after review.</p>
          <p>Please ensure the following:</p>
          <ul>
            <li>Upload clear and valid ID and address proof.</li>
            <li>Ensure details match your profile.</li>
          </ul>
          <p>You may try submitting again after correcting the above issues.</p>
          <br>
          <p>Regards,<br>Team Edunity</p>
        </div>
      `
    });

  } catch (error) {
    console.log('Email sending failed:', error);
  }
};

module.exports = {sendOtp , kycRejectMail};
