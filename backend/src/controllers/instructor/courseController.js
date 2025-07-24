

const courseService = require('../../services/instructor/courseServices')


    const addCourse = async (req,res)=>{
        try {

            const file = req.file.filename
            // console.log(req.file);
            
            const courseData = {
                        ...req.body,
                        thumbnail : file,
                        modules: JSON.parse(req.body.modules),
            }
            
            console.log('course controller',courseData);

            
            
            const save = await courseService.add(courseData)

            if(save){
                res.status(200).json({success:true})
                return 
            }
            
            console.log("failed");
            res.status(500).json({ success: false, message: "Failed to save course" });

            
        } catch (error) {
            console.log(error);
            
        }
    }

const editCourse = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(req.body);
    
    const courseData = {
      ...req.body,
      modules: JSON.parse(req.body.modules),
    };

    if (req.file) {
      courseData.thumbnail = req.file.filename;
    }

    console.log('edit course controller', courseData);

    const updated = await courseService.updateCourse(courseData, id);

    if (updated) {
      return res.json({ success: true, message: "Course updated successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Update failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




    const getCourse = async (req,res)=>{
        try {
            const token = req.query.id
            console.log('get Courses ');
            
            const data = await courseService.fetchCourses(token)
            console.log(data);
            

            res.json({success:true,course:data})
        } catch (error) {
            console.log(error);
            
        }
    }


    const courseDetails = async(req,res)=>{
        try {
            const id = req.query.id
            console.log('course Details ',id);
            
            const course = await courseService.getDetails(id)

            res.json({success:true,course:course})
        } catch (error) {
            console.log(error);
            
        }
    }

  
    



    


module.exports = {addCourse , getCourse , courseDetails ,editCourse}