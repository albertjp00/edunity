const KYC  = require('../../models/kycModel')
const jwt = require('jsonwebtoken')
const Instructor = require('../../models/instructorModel')


const kycSubmit = async (idProof,addressProof,token)=>{
    try {
        const id = jwt.verify(token,'secret key')
        console.log(id);
        
        
        const kyc= await KYC.create({instructorId:id.id,idProof:idProof,addressProof:addressProof})

        const instructor = await Instructor.findByIdAndUpdate(id.id,{KYCstatus:'pending'})

        return kyc

    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports = {kycSubmit}