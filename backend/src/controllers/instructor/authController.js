const authService = require('../../services/instructor/authServices');


const register =  async (req,res)=>{
    try {
        console.log(req.body);
    
    const result = await authService.registerRequest(req.body)

    if(result){
        res.json(result);
    }
    } catch (error) {
        console.log(error);
        
    }
}


const verifyOtpAndRegister = async (req, res) => {
  try {
    console.log('verifyOtpRegister instructor');
    console.log(req.body);
    
    const result = await authService.verifyOtp(req.body);
    console.log('result',result);
    
    res.json({result:result});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const resendOtpRequest  = async (req,res)=>{
    try {
        console.log('resend otp' ,req.body);
        
        const result = await authService.resendOtp(req.body)
        console.log('resed result ', result);
        
        res.json({result:result})
    } catch (error) {
        console.log(error);
        
    }
}


const loginInstructor = async (req, res) => {
  try {
    console.log('login instructor');
    
    const instructor = await authService.login(req.body);
    
    
    res.json(instructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = {register , verifyOtpAndRegister , resendOtpRequest ,loginInstructor}