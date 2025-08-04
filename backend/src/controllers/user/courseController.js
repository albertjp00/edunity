
const userCourseService = require('../../services/user/userCourseService')






        const getCourses = async (req, res) => {
        try {
            console.log('get Courses user');

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 6;

            const data = await userCourseService.fetchCourses(page, limit);

            res.json({
            success: true,
            course: data.courses,
            skills: data.skills,
            totalPages: data.totalPages,
            currentPage: data.currentPage
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Failed to get courses" });
        }
        };




    
        const courseDetails = async(req,res)=>{
            try {
                const id = req.query.id
                console.log('user get details course',id);
                
                const result = await userCourseService.getDetails(id)
                
                console.log(result);
                
                res.json({success:true,course:result})
            } catch (error) {
                console.log(error);
                
            }
        }


        const buyCourse = async(req,res)=>{
            try {
                const {user,course} = req.body
                const id = req.user.id
                console.log('buy Course user ',id,user,course);
                
                const result = await userCourseService.buyCourse(id,course)

                res.json({success:true})
            } catch (error) {
                console.log(error);
            }
        }


        
          const getMyCourses = async(req,res)=>{
      try {
        const token = req.query.id
        console.log('my courses ',token);
        
        const result = await userCourseService.myCourses(token)
        // console.log(result);
        
        res.json({success:true,courses:result})
      } catch (error) {
        console.log(error);
        
      }
    }


    const viewMyCourse = async (req,res)=>{
        try {
            const id = req.query.id
            console.log(id);
            
            const data = await userCourseService.viewCourse(id)
            console.log('view my course ',data);
            res.json({success:true,course:data})
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const updateProgress = async (req, res) => {
  try {
    const { courseId, moduleTitle } = req.body;
    console.log('update progress' , courseId , moduleTitle);
    

  const update = await userCourseService.updateProgress(courseId,moduleTitle)

  res.json({ success: true, message: 'Progress updated' });
  } catch (error) {
    console.log(error);
    
  }
};


module.exports = {getCourses , courseDetails , buyCourse ,getMyCourses ,
    viewMyCourse , updateProgress
}