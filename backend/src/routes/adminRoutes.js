const express = require('express')
const adminRoute = express()
const { loginAdmin } = require('../controllers/admin/auth-controller')
const { getUsers } = require('../controllers/admin/getUser-controller')
const {getInstructors, getKyc, verifyKyc, rejectKyc} = require('../controllers/admin/getInstructors-controller')
const { blockUser, unblockUser } = require('../controllers/admin/blockUnblockUser')


adminRoute.post('/login',loginAdmin)

adminRoute.get('/get-users',getUsers)

adminRoute.get('/get-instructors',getInstructors)

adminRoute.put('/block-user',blockUser)

adminRoute.put('/unblock-user',unblockUser)

adminRoute.get('/get-kyc/:id',getKyc)

adminRoute.put('/verify-kyc/:id',verifyKyc)

adminRoute.put('/reject-kyc/:id',rejectKyc)


module.exports=adminRoute


