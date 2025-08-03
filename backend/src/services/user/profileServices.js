
const User = require('../../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const getProfile = async (userId) => {
  try {
    const user = await User.findById(userId)
    return user;
  } catch (error) {
    console.error('Profile service error:', error);
    throw error;
  }
};



const editProfile = async (token,data)=>{
    try {
        const id = jwt.verify(token,'secret key')
        console.log(id);
        
    const update = await User.findByIdAndUpdate(id.id,data, 
        {new:true}
    )
    if(update){
        return true
    }
    
    } catch (error) {
        console.log(error);
        
    }
}


const passwordChange = async (old,newPass,token )=>{
    try {
        console.log('pass change servicce',old,newPass,token);
        
        const id = jwt.verify(token,'secret key')
        const user = await User.findById(id.id)

        const isMatch = await bcrypt.compare(old,user.password)
        if(!isMatch) throw new Error('invalid old password')

            const hashed = await bcrypt.hash(newPass,10)
        user.password = hashed
        await user.save()
        return true
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = {getProfile,editProfile,passwordChange}