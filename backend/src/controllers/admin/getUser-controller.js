const { getUserService } = require("../../services/admin/getUsers-services");



const getUsers = async (req,res)=>{
    try {
        // console.log('get-users');

        const data = await getUserService()
        // console.log(data);
        
        res.json({data:data})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {getUsers}