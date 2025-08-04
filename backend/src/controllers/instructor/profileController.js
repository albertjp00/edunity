
const profileServices = require('../../services/instructor/profileServices')

const profileDetails = async (req,res)=>{
    try {
        console.log('profiledetails');
        
        const instructorId = req.instructor.id
        // console.log('instructor token',token);

        const InstructorDetails = await profileServices.getProfile(instructorId)
        // console.log(InstructorDetails);
        

        res.json({success:true,data:InstructorDetails})

        
    } catch (error) {
        console.log(error);

    }
}

const profileEdit = async (req,res)=>{
    try {
        const id = req.instructor.id

        console.log('profilr instructor edit');
        
        const file = req.file
        const data = {
            ...req.body
        }
        if(req.file){
            data.profileImage = file.filename || undefined
        }

        const update = await profileServices.editProfile(id,data)

        if(update){
            res.json({success:true})
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

const passwordChange = async(req,res)=>{
    try {
            
            const {oldPassword,newPassword} = req.body
    
            console.log('instructor change password ',oldPassword , newPassword);
    
            const authHeader = req.headers['authorization']
            const token  = authHeader && authHeader.split(' ')[1]

            console.log('token',token);
            
    

            const update = await profileServices.passwordChangeService(oldPassword,newPassword,token)
    
            if(update){
                res.status(200).json({success:true})
            }else{
                res.json({message:'Invalid password'})
            }
    
        } catch (error) {
            console.log(error);
            return res.status(400).json({success:false,message:error.message || 'something went wrong'})
        }
}

module.exports = {profileDetails,profileEdit, passwordChange}