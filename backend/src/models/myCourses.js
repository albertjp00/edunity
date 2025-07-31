const mongoose = require('mongoose');

const myCourseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  course: {
    id: String,
    title: String,
    description: String,
    price: String,
    thumbnail: String,
    modules: [
      {
        title: String,
        videoUrl: String,
        content: String,
      },
    ],
  },

  progress: {
  completedModules: [String], // Store module titles or IDs
},


  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('MyCourse', myCourseSchema);
