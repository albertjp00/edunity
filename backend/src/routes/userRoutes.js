const express = require("express");
const router = express.Router()
const { registerRequest, verifyOtpAndRegister } = require("../controllers/user/authController");
const { loginUser } = require("../controllers/user/authController");
const { profile, editProfile, changePassword } = require("../controllers/user/profileController");

const path = require('path')
const multer = require('multer');
const { forgotPassword, verifyOtpPass, resetPassword } = require("../controllers/user/forgotPass");
const { getCourses, courseDetails, buyCourse, getMyCourses, viewMyCourse } = require("../controllers/user/courseController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../assets')); // go up to root if this file is in /routes/
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, '_').replace(/[()]/g, '');
    cb(null, Date.now() + '-' + safeName);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};  

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});


router.post("/register", registerRequest);
router.post("/login", loginUser);
router.post('/verifyOtp',verifyOtpAndRegister)

router.get('/profile',profile)
router.put('/editProfile',upload.single('profileImage'),editProfile)
router.put('/changePassword',changePassword)

router.post('/forgot-password',forgotPassword)
router.post('/verify-otp',verifyOtpPass)
router.put('/resetPassword',resetPassword)


router.get('/getCourses',getCourses)
router.get('/courseDetails',courseDetails)

router.post('/buyCourse',upload.none(),buyCourse)

router.get('/myCourses',getMyCourses)
router.get('/viewMyCourse',viewMyCourse)

module.exports = router
