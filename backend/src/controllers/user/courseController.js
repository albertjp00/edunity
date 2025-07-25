
const userCourseService = require('../../services/user/userCourseService')






    const getCourses = async (req,res)=>{
        try {
            console.log('get Courses user');
            
            const data = await userCourseService.fetchCourses()
            console.log(data);
            

            res.json({success:true,course:data})
        } catch (error) {
            console.log(error);
            
        }
    }



    
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
                console.log('buy Course user ',user,course);
                
                const result = await userCourseService.buyCourse(user,course)

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
        console.log(result);
        
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

module.exports = {getCourses , courseDetails , buyCourse ,getMyCourses ,
    viewMyCourse
}