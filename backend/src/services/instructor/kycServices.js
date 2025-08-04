const KYC  = require('../../models/kycModel')
const jwt = require('jsonwebtoken')
const Instructor = require('../../models/instructorModel')


const kycSubmit = async (idProof,addressProof,id)=>{
    try {
        
        console.log('kyc submit resubmit',id);
        
        const kyc= await KYC.create({instructorId:id,idProof:idProof,addressProof:addressProof})

        const instructor = await Instructor.findByIdAndUpdate(id,{KYCstatus:'pending'},{new:true})
        console.log(instructor);
        

        return kyc

    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports = {kycSubmit}