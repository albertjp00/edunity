const mongoose = require('mongoose')


const InstructorSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    expertise:{
        type:String
    },
    bio:{
        type:String
    },
    profileImage:{
        type:String
    },
    KYCApproved:{
        type:Boolean,
        default:false
        
    },
    joinedAt:{
        type:Date,
        default:Date.now()
    },
    KYCstatus:{
        
        type:String,
        enum : ["pending","verified","rejected","notApplied"],
        default : "notApplied"
    },

    work:{
        type : String
    },

    education :{
        type:String
    }



})


module.exports = mongoose.model("Instructor",InstructorSchema)