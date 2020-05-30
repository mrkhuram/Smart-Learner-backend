const express = require('express');
const router = express.Router();

const CourseController = require('../../../controllers/customer/course');

router.post('/searchcourse', CourseController.searchCourse);
router.post('/getcourse', CourseController.getCourse);
router.post('/getallcourses', CourseController.getAllcourses);
router.post('/getmanycourses', CourseController.getManycourses); 
router.post('/getfeaturedcourses', CourseController.getFeaturedcourses);
router.post('/gettrendingcourses', CourseController.getTrendingcourses);
router.post('/getfilteredcourses', CourseController.getFilteredcourses);  
router.post('/getinstructorcourses', CourseController.getInstructorCourses); 
router.post('/getinstitutecourses', CourseController.getInstituteCourses);
router.post('/getpuchasedcourse', CourseController.getPurchasedCourse); 
router.post('/getcategorizedcourse', CourseController.getCoursesByCategory); 



module.exports = router;