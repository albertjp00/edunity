const Course = require('../../models/courseModel')
const jwt = require('jsonwebtoken')
const MyCourse = require('../../models/myCourses')
const Instructor = require('../../models/instructorModel')



const fetchCourses = async (page = 1, limit = 6) => {
  try {
    const skip = (page - 1) * limit;

    const [courses, total, skillsAgg] = await Promise.all([
      Course.find().skip(skip).limit(limit),
      Course.countDocuments(),
      Course.aggregate([
        { $unwind: "$skills" },
        { $group: { _id: null, uniqueSkills: { $addToSet: "$skills" } } },
        { $project: { _id: 0, uniqueSkills: 1 } }
      ])
    ]);

    const skills = skillsAgg[0]?.uniqueSkills || [];
    const totalPages = Math.ceil(total / limit);

    return {
      courses,
      skills,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    console.log(error);
  }
};



const getDetails = async (id)=>{
  try {

    const course = await Course.findById(id)
    const instructor = await Instructor.findById(course.instructorId)
    console.log('instuc' , instructor);
    
    const data = {
        course,
        instructor
    }
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