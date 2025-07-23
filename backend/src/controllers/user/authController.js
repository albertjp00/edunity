const authService = require('../../services/user/authServices');




const registerRequest = async (req, res) => {
  try {
    const result = await authService.registerRequest(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const verifyOtpAndRegister = async (req, res) => {
  try {
    console.log('verifyOtpRegister');
    console.log(req.body);
    
    const result = await authService.verifyOtpAndRegister(req.body);
    console.log('result',result);
    
    res.json({result:result});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};






const loginUser = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);

    if (user.blocked) {
      return res.status(403).json({ message: 'Your account is blocked' });
    }

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

  

module.exports = { registerRequest , verifyOtpAndRegister, loginUser };
