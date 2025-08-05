const express = require('express')
const { register, verifyOtpAndRegister, resendOtpRequest, loginInstructor } = require('../controllers/instructor/authController')
const { profileDetails, profileEdit, passwordChange } = require('../controllers/instructor/profileController')
const instructorRoute = express()

const path = require('path')
const multer = require('multer')
const { kycSubmit } = require('../controllers/instructor/kycController')
const { addCourse, getCourse, courseDetails, editCourse } = require('../controllers/instructor/courseController')
const { instAuthMiddleware } = require('../middleware/authMiddleware')


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
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {    
        cb(null, true);
  } else {
     cb(new Error('Only JPG, PNG, or PDF files are allowed!'), false);
  }
};

const upload = multer({
    storage : storage,
    fileFilter : fileFilter
})


instructorRoute.post('/register',register)
instructorRoute.post('/verifyOtp',verifyOtpAndRegister)
instructorRoute.post('/resendOtp',resendOtpRequest)
instructorRoute.post('/login',loginInstructor)

instructorRoute.get('/profile', instAuthMiddleware,profileDetails)
instructorRoute.put('/profile', instAuthMiddleware ,upload.single('profileImage'),profileEdit)
instructorRoute.post('/kycSubmit' ,instAuthMiddleware ,
  upload.fields([
    { name: 'idProof', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 }
  ]),
  kycSubmit
);

instructorRoute.put('/passwordChange', instAuthMiddleware ,passwordChange)

instructorRoute.post('/addCourse', instAuthMiddleware ,upload.single('thumbnail'),addCourse)

instructorRoute.put('/editCourse', instAuthMiddleware , upload.single('thumbnail'),editCourse)

instructorRoute.get('/getCourse' , instAuthMiddleware ,getCourse)

instructorRoute.get('/courseDetails' , instAuthMiddleware ,courseDetails) 

module.exports = instructorRoute