const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth');
const InstructorRoute = require('./instructor');
const CouponRoutes = require('./coupon');

const CourseRoute = require('./course');
const ChapterRoutes = require('./chapter');
const ReviewRoutes = require('./review'); 
const CommentRoutes = require('./comment');   
const WithdrawRoutes = require('./withdraw'); 
// const PayRegistrationFee = require('./payFee');     



const isLoggedIn = require('../../../middlewares/is-logged-in');
  
router.use('/auth', AuthRoutes);  
router.use('/updateinstructor', InstructorRoute);  


router.use('/coupon', CouponRoutes);
router.use('/instructor', InstructorRoute); 
router.use('/course', CourseRoute);
router.use('/chapter', ChapterRoutes);
router.use('/review', ReviewRoutes);
router.use('/comment', CommentRoutes);
router.use('/withdraw', WithdrawRoutes);
// router.use('/registation', PayRegistrationFee);  


 

module.exports = router;
