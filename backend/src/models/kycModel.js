
const mongoose = require('mongoose')


const KycSchema = new mongoose.Schema({
    instructorId : {
        type:String
    },
    idProof : {
        type:String
    },
    addressProof:{
        type:String
    }
})

module.exports = mongoose.model('kyc',KycSchema)