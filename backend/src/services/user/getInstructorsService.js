const Instructor = require('../../models/instructorModel')


const getDetails = async ()=>{
    try {
        
        const data = await Instructor.find()
        return data
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {getDetails}