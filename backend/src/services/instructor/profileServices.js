
const Instructor = require('../../models/instructorModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const getProfile = async (id)=>{
    try {

        
        // console.log('instId',id);
        
        const instructor = await Instructor.findById(id)
        return instructor
        
    } catch (error) {
        console.log(error);
        
    }
}

const editProfile = async (id,data)=>{
    try {
        console.log('editProfile');
        
        console.log(id);
        console.log(data);
        
        
    const update = await Instructor.findByIdAndUpdate(id,data,
        {new:true}
    )
    if(update){
        return true
    }
    
    } catch (error) {
        console.log(error);
        
    }
}

const passwordChangeService = async (old,newPass,id )=>{
    try {
        console.log('pass change servicce',old,newPass,id);
        
        
        const user = await Instructor.findById(id)

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

module.exports = {getProfile,editProfile,passwordChangeService}