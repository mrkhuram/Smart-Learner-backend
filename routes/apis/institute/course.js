const express = require('express');
const router = express.Router();

const CourseController = require('../../../controllers/institute/course');

const Upload = require('../../../common/multer');

router.post('/', Upload.any(), CourseController.addCourse);
router.post('/getcourse', CourseController.getCourse);
router.post('/get_all', CourseController.getAllCourses);
router.post('/updatecourse', CourseController.updateCourse);

  
 
module.exports = router;