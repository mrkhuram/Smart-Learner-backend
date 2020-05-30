const express = require('express');
const router = express.Router();

const CourseOrderController = require('../../../controllers/customer/course_order');

router.post('/placeorder', CourseOrderController.placeOrder);
router.post('/getallorders', CourseOrderController.getOrderedCourses);
router.post('/addprogress', CourseOrderController.addProgress);




module.exports = router 