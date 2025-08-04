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

    let hasAccess = false
    const myCourse = await MyCourse.findOne({'course.id':id})
    console.log('mycCoure',myCourse);
    
    if(myCourse){
        hasAccess = true
    }
    const instructor = await Instructor.findById(course.instructorId)
    console.log('instuc');
    
    return {
        course,
        instructor,
        hasAccess,
        completedModules: myCourse?.completedModules || []
        };

    console.log('course details services ');
    
    return data
  } catch (error) {
    console.log(error);
    
  }
}

 

const buyCourse = async (id, courseId) => {
  try {
    

    const course = await Course.findById(courseId);
    if (!course) throw new Error('Course not found');
    console.log('bought ',course);
    
    const myCourse = await MyCourse.create({
      id  ,
      course: {
        id:course._id,
        title: course.title,
        description: course.description,
        price: course.price,
        thumbnail: course.thumbnail,
        modules: course.modules,
      }
    });

    console.log('buying done ----- ',myCourse.course.modules );
    

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
    console.log("My Courses:");

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

const updateProgress = async(courseId,moduleTitle)=>{
    try {
        const course = await MyCourse.findOne({'course.id':courseId});

  if (!course.progress) {
    course.progress = { completedModules: [] };
  }

  if (!course.progress.completedModules.includes(moduleTitle)) {
    course.progress.completedModules.push(moduleTitle);
    await course.save();
    return true
  }
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {fetchCourses, getDetails , buyCourse ,myCourses ,viewCourse ,updateProgress}