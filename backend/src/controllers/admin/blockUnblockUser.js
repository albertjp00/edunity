const blockService = require('../../services/admin/blockUser-services')

const blockUser = async(req,res)=>{
    try {
        console.log('block');
        
        const id = req.query.id
        console.log(id);
        
        const update  = await blockService.userBlock(id)
        if(update){
            res.status(200).json({success:true})
        }
    } catch (error) {
        console.log(error);
        
    }
}

const unblockUser = async(req,res)=>{
    try {
        console.log('unblock');
        
        const id = req.query.id
        console.log(id);
        
        const update  = await blockService.userUnblock(id)
        if(update){
            res.status(200).json({success:true})
        }
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {blockUser,unblockUser}