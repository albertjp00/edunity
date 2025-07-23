const User = require('../../models/userModel')
const jwt = require('jsonwebtoken')

//login ---------
const adminLogin = async ({ email, password }) => {
    try {
        console.log('auth service ');        
    
  const user = await User.findOne({ email:email,role:'admin' });
  
//   if (!user) throw new Error("Invalid email");

  const isMatch = user.password === password
  if (!isMatch) throw new Error("Invalid password");

  let adminToken = jwt.sign({ id: user._id }, 'secret key', {
      expiresIn: "1d"
    });
    return {user,adminToken}
    } catch (error) {
        console.log(error);
        
    }
};

module.exports = { adminLogin };