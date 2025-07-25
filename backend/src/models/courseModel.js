const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({

    instructorId: {
    type: String ,
  },

  title: { 
    type: String, 
    required: true 
    },

  description: String,

  thumbnail: String,

  price: Number,

  skills:{
    type:Array
  },

  modules: [

    {
        title: String,
        videoUrl: String,
        content: String,
    }
  ],

  //   modules: [

  //   {
  //     title: String,
  //     lessons: [
  //       {
  //         title: String,
  //         videoUrl: String,
  //         content: String,
  //       }
  //     ]
  //   }
  // ],

  createdAt: { type: Date, default: Date.now },

  totalEnrolled:{
    type:Number,
    default:0
  }
  
});

module.exports = mongoose.model('Course', CourseSchema);
