const Course = require('../../models/courseModel')
const jwt = require('jsonwebtoken');
const myCourses = require('../../models/myCourses');


const add = async (data) => {
  try {
    console.log('add course ', JSON.stringify(data, null, 2));
    

    const id = jwt.verify(data.instructorId,'secret key')
    console.log('instructor id ',id);
    
    data.instructorId = id.id

    const course = new Course(data);
    const added = await course.save();

    if (added) {
      console.log("Course saved successfully");
      return true;
    }

    console.log("❌ Course not saved");
    return false;
  } catch (error) {
    console.error('❌ Error while saving course:', error.message);
    console.error(error);
    throw error; // so your controller catches it too
  }
};


const updateCourse = async (data, id) => {
  try {
    const updated = await Course.findByIdAndUpdate(id, data, { new: true });

    if (updated) {
      console.log("Course updated successfully");
      return true;
    }

    console.log("Course update failed");
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};


const fetchCourses = async (token)=>{
    try {

        const id = jwt.verify(token,'secret key') 
        console.log(id);
        

        const courses = await Course.find({instructorId : id.id})
        // console.log(courses);
        

        return courses
    } catch (error) {
        console.log(error);
        
    }
}


const getDetails = async (id)=>{
  try {
    const data = await Course.findById(id)
    console.log('course details services ',data);
    
    return data
  } catch (error) {
    console.log(error);
    
  }
}


module.exports = {add,fetchCourses , getDetails , updateCourse}