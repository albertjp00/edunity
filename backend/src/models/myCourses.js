const mongoose = require('mongoose');

const myCourseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  course: {
    id:String,
    title: String,
    description: String,
    price: String,
    thumbnail: String,
    modules: [
      {
        title: String,
        lessons: [
          {
            title: String,
            videoUrl: String,
            content: String
          }
        ]
      }
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MyCourse', myCourseSchema);
