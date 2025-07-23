const User = require('../../models/userModel')


const getUserService = async()=>{
    try {
        // console.log('service');
        
        const users = await User.find({name:{$ne:'admin'}})
        return users
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {getUserService}