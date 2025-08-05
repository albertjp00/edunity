const authService = require('../../services/admin/authServices')


const loginAdmin = async (req, res) => {
  try {
    console.log('login Admin');
    console.log(req.body);
    
    const user = await authService.adminLogin(req.body);
    
    
    res.json({user:user,success:true});
  } catch (err) {
    res.status(400).json({ message: "An error occured" });
  }
};



module.exports = {  loginAdmin };