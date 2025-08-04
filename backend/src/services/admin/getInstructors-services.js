const { kycRejectMail } = require('../../emails/sendOtp')
const Instructor = require('../../models/instructorModel')
const KYC = require('../../models/kycModel')


const getInstructorService = async()=>{
    try {
        
        const instructors = await Instructor.find()
        return instructors
    } catch (error) {
        console.log(error);
        
    }
}

const fetchKyc = async (id)=>{
    try {
        console.log('get kyc services');
        
        const details = await KYC.findOne({instructorId:id})
        console.log(details);
        

        return details
    } catch (error) {
        console.log(error);
        
    }
}

const verify = async (id)=>{
    try {
        const update = await Instructor.findByIdAndUpdate(id,{KYCstatus:'verified'})

        const ins = await Instructor.findByIdAndUpdate(id,{KYCApproved:true})
        console.log(ins);
        
        if(update){
            return true
        }
    } catch (error) {
        console.log(error);
        
    }
}


const reject = async (id)=>{
    try {
        const update = await Instructor.findByIdAndUpdate(id,{KYCstatus:'rejected'})
        const deleteKyc = await KYC.findOneAndDelete({instructorId : id})



        // const del = await KYC.findOneAndDelete({instructorId:id})

        // const ins = await Instructor.findByIdAndUpdate(id,{KYCApproved:true})
        // console.log(ins);

          let defaultEmail = 'albertjpaul@gmail.com'
          await kycRejectMail(defaultEmail);
        
        if(update){
            return true
        }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {getInstructorService,fetchKyc , verify , reject}    