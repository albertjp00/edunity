import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
// import {store} from './store'

import Register from './user/pages/register/register'
import Login from './user/pages/login/login'
import Home from './user/pages/home/home'
import VerifyOtp from './user/pages/register/verifyOtp'
import ProfileCard from './user/pages/profile/userProfile'
import ChangePassword from './user/pages/profile/changePassword';
import ForgotPassVerifyOtp from './user/pages/forgotPass/verify-otp';
import ForgotPassword from './user/pages/forgotPass/forgotPass';
import ResetPassword from './user/pages/forgotPass/resetPassword';
import CourseDetailsUser from './user/components/courses/courseDetails';
import MyCourses from './user/pages/myCourses/myCourses';
import ViewMyCourse from './user/pages/myCourses/viewMyCourse';





// admin
import AdminLogin from './admin/pages/login/login'
import Dashboard from './admin/pages/dashboard/dashboard'
import AdminHome from './admin/pages/home/home'
import EditProfile from './user/pages/profile/editProfile';
import { ToastContainer } from 'react-toastify';



import InstructorRegister from './instructor/pages/register/register';
import OtpVerify from './instructor/pages/register/otpVerify';
import InstructorHome from './instructor/pages/home/home';
import Profile from './instructor/pages/profile/profile';
import ProfileEdit from './instructor/pages/profile/editProfile';
import InstructorLogin from './instructor/pages/login/login';
import KycVerification from './instructor/pages/profile/kyc';
import PasswordChange from './instructor/pages/profile/passwordChange';
import ViewKYC from './admin/pages/instructors/verifyKyc';

import AddCourse from './instructor/pages/addCourses/addCourses';
import CourseDetails from './instructor/pages/courseDetails/courseDetails';

import EditCourse from './instructor/pages/editcourses/editCourse';


function App() {
  const [count, setCount] = useState(0)

  return (
    // <Provider store={store}>    
    <>
      <div className='app'>
        <ToastContainer />

          <Router>
            <Routes>
              <Route path='/user/home'  element={<Home />} />
              <Route path='/user/login' element={<Login />} />
              <Route path='/user/register' element={<Register />} />
              <Route path='/user/verifyOtp' element={<VerifyOtp />}/>

              <Route path='/user/forgotPassword' element={<ForgotPassword />}/>

              <Route path='/user/profile' element={<ProfileCard />}/>
              <Route path='/user/editProfile' element={<EditProfile />} />
              <Route path='/user/changePassword' element={<ChangePassword />} />
              <Route path='/user/verify-otp' element={<ForgotPassVerifyOtp />} />

              <Route path='/user/resetPassword' element={<ResetPassword />} />

              <Route path='/user/courseDetails/:id' element={<CourseDetailsUser />}/>
              <Route path='/user/myCourses' element={<MyCourses />}/>
              <Route path='/user/viewMyCourse/:id' element={<ViewMyCourse />}/>





            {/* Instructor */}
            <Route path='/instructor/login' element={<InstructorLogin />} />
            <Route path='/instructor/register' element={<InstructorRegister />} />
            <Route path='/instructor/otpVerify' element={<OtpVerify />} />

            <Route path='/instructor/home' element={<InstructorHome />} />
            <Route path='/instructor/profile' element={<Profile />} />
            <Route path='/instructor/editProfile' element={<ProfileEdit />} />
            <Route path='/instrcutor/passwordChange' element={<PasswordChange />} />
            <Route  path='/instructor/kyc' element={<KycVerification />}/>

            <Route  path='/instructor/addCourse' element={<AddCourse />}/>
            <Route path='/instructor/courseDetails/:id' element={<CourseDetails />} />
            <Route path='/instructor/editCourse/:id' element={<EditCourse />} />






              // {/* admin  */}
              <Route  path='/admin/login' element={<AdminLogin />}/>
              <Route path='/admin/*' element={<AdminHome />}/>
              <Route path='/admin/viewKyc/:id' element={<ViewKYC />}/>

            


            

            </Routes>
          </Router>
      </div>
      
      
    </>
    // </Provider>

  )
}

export default App
