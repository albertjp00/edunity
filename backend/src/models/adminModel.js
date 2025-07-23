const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

  name: {
    type : String
  },

  email: { 
    type: String, 
    unique: true 
    },

  password: String,

  

});

module.exports = mongoose.model('User', AdminSchema);