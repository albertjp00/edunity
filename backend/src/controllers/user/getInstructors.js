

const getInstructorService = require('../../services/user/getInstructorsService')


const getInstructotDetails = async (req,res)=>{
    try {
        

        const data = await getInstructorService.getDetails()

        res.json({success:true, instructor:data})
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {getInstructotDetails  }