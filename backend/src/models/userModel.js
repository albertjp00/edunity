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

    blocked:{

      type:Boolean,
      default : false
    },

  createdAt: { 
    type: String 
}

});

module.exports = mongoose.model('User', UserSchema);
