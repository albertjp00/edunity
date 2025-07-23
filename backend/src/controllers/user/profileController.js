
const profileServices = require('../../services/user/profileServices')

const profile = async (req,res)=>{
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token);

        const userDetails = await profileServices.getProfile(token)
        console.log(userDetails);
        

        res.json({success:true,data:userDetails})

        
    } catch (error) {
        console.log(error);

    }
}

const editProfile = async (req,res)=>{
    try {
        const authHeader = req.headers['authorization']
        const token  = authHeader && authHeader.split(' ')[1]
        const file = req.file
        console.log('edit req.body',req.body , file);
        
        const data  = {
            ...req.body,
        }
        if(file){
            data.profileImage = file.filename || undefined
        }

        const update = await profileServices.editProfile(token,data)

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

        const authHeader = req.headers['authorization']
        const token  = authHeader && authHeader.split(' ')[1]

        

        const update = await profileServices.passwordChange(oldPassword,newPassword,token)

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

module.exports = {profile,editProfile,changePassword}