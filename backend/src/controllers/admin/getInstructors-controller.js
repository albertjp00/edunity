const  { getInstructorService ,  fetchKyc, verify , reject} = require("../../services/admin/getInstructors-services");




const getInstructors = async (req,res)=>{
    try {
        const data = await getInstructorService()

        res.json({data:data})
    } catch (error) {
        console.log(error);
        
    }
}


const getKyc = async (req,res)=>{
    try {
    
        const id = req.params.id

        console.log('get kyc admin',id);

        const details = await fetchKyc(id)

        res.json({success:true,details:details})
    } catch (error) {
        console.log(error);
        
    }
}


const verifyKyc = async (req,res)=>{
    try {
        const id = req.params.id
        console.log('admin verify ',id);
        
        const update = await verify(id)

       if(update){
         res.json({success:true})

       }
    } catch (error) {
        console.log(error);
        
    }
}

const rejectKyc = async (req,res)=>{
    try {
        const id = req.params.id
        console.log('admin reject kyc ',id);
        
        const update = await reject(id)

       if(update){
         res.json({success:true})

       }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {getInstructors,getKyc,verifyKyc , rejectKyc}