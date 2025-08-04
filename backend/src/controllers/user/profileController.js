
const profileServices = require('../../services/user/profileServices')



const profile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await profileServices.getProfile(userId);

    if (!userDetails) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: userDetails });
  } catch (error) {
    console.error('Profile controller error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};




const editProfile = async (req,res)=>{
    try {
        const userId = req.user
        const file = req.file
        console.log('edit req.body',req.body , file);
        
        const data  = {
            ...req.body,
        }
        if(file){
            data.profileImage = file.filename || undefined
        }

        const update = await profileServices.editProfile(userId,data)

        if(update){
            res.json({success:true})
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

const changePassword = async(req,res)=>{
    try {
        
        const {oldPassword,newPassword} = req.body


        console.log('user change password ',oldPassword , newPassword);

        const userId = req.user.id

        

        const update = await profileServices.passwordChange(oldPassword,newPassword,userId)

        if(update){
            res.status(200).json({success:true})
        }else{
            res.json({message:'Invalid password'})
        }

    } catch (error) {
  console.log(error);

  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error('Something went wrong. Please try again.');
  }
}

}

module.exports = {profile,editProfile,changePassword}