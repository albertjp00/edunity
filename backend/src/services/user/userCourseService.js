const Course = require('../../models/courseModel')
const jwt = require('jsonwebtoken')
const MyCourse = require('../../models/myCourses')



const fetchCourses = async (token)=>{
    try {

        const courses = await Course.find({})   

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

 

const buyCourse = async (userToken, courseId) => {
  try {
    const decoded = jwt.verify(userToken, 'secret key');
    const userId = decoded.id;

    const course = await Course.findById(courseId);
    if (!course) throw new Error('Course not found');
    console.log('bought ',course);
    
    const myCourse = await MyCourse.create({
      userId,
      course: {
        id:course._id,
        title: course.title,
        description: course.description,
        price: course.price,
        thumbnail: course.thumbnail,
        modules: course.modules,
      }
    });

    return myCourse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




const myCourses = async (token) => {
  try {
    const decoded = jwt.verify(token, 'secret key');
    console.log(decoded);

    const courses = await MyCourse.find({ userId: decoded.id });
    console.log("My Courses:", courses);

    return courses.map(entry => entry.course);
  } catch (error) {
    console.log(error);
    return [];
  }
};


const viewCourse = async (id)=>{
    try {
        const course = await MyCourse.findOne({'course.id' : id})
        return course
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {fetchCourses, getDetails , buyCourse ,myCourses ,viewCourse}