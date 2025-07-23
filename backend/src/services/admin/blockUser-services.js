const User = require('../../models/userModel')


const userBlock = async(id)=>{
    try {
        const update = await User.findByIdAndUpdate(id,{blocked:true},{new:true})

        return true
    } catch (error) {
        console.log(error);
        
    }
}

const userUnblock = async(id)=>{
    try {
        // console.log('service unblock');
        
        const update = await User.findByIdAndUpdate(id,{blocked:false},{new:true})
        // console.log(update);
        
        return true
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {userBlock,userUnblock}