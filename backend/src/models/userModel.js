const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  name: {
    type : String
  },

  email: { 
    type: String, 
    unique: true 
    },

  password: String,

  role: { 
    type: String, 
    default: 'user'
    },

    profileImage:{
      type : String
    },

    bio: {
      type: String,
      default: ''
    },
    phone: {
      type: String
    },
    location: {
      type: String
    },
    dob: {
      type: String
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    },

    blocked:{

      type:Boolean,
      default : false
    },

  createdAt: { 
    type: String 
}

});

module.exports = mongoose.model('User', UserSchema);
