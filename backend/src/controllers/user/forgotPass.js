
const forgotPassServices = require('../../services/user/forgotPassServices')



const forgotPassword = async (req,res)=>{
    try {
        const {email} = req.body
        console.log('forgot pass', email);
        
        const send = await forgotPassServices.sendOtpForgotPass(email)

        if(send){
            res.json({ success: true, message: "OTP sent to email" });
        }
    } catch (error) {
        if (error.message === "Email doesn't exist") {
      return res.status(404).json({ success: false, message: error.message });
       
        
    }
     console.log(error);
    }
}


const verifyOtpPass = async (req,res)=>{
    try {
        const {otp,email} = req.body
        console.log('verify forgot otp',email,otp);
        
        const verified = await forgotPassServices.verifyOtpForgotPass(email,otp)

        if(verified){
            return res.json({success:true,message:"otp verified"})
        }
     } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, message: error.message });
    }
}


const resetPassword = async (req,res)=>{
    try {
        const {email, newPassword} = req.body
        console.log('reset forgot pass');
        
        const reset = await forgotPassServices.resetPass(email,newPassword)

        res.json({success:true})

     } catch (error) {
        console.log(error);
        
    }
}

module.exports = {forgotPassword,verifyOtpPass , resetPassword}