const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth');
const ReviewRoutes = require('./review');
const CommentRoutes = require('./comment');
const CourseRoutes = require('./course');
const ChapterRoutes = require('./chapter');
const CustomerRoutes = require('./customer');
const ServiceRoutes = require('./service');
const EventRoutes = require('./event');
const InstructorRoutes = require('./instructor');
const InstituteRoutes = require('./institute');
const FreelancerRoutes = require('./freelancer');
// const StripeRoutes = require('./stripe');
const CourseOrderRoutes = require('./course_order');
const CourseCategoriesRoutes = require('./course_category');
const ServiceOrderRouts = require('./service_order');
const MessagingRouts = require('./messaging');
const SliderRoutes = require('./slider');




router.use('/auth', AuthRoutes);
router.use('/review', ReviewRoutes);
router.use('/comment', CommentRoutes);
router.use('/course', CourseRoutes);
router.use('/chapter', ChapterRoutes);
router.use('/cutomers', CustomerRoutes);
router.use('/service', ServiceRoutes);
router.use('/event', EventRoutes); 
router.use('/instructor', InstructorRoutes);
router.use('/institute', InstituteRoutes);
router.use('/freelancer', FreelancerRoutes);
// router.use('/payment', StripeRoutes);
router.use('/courseorder', CourseOrderRoutes);
router.use('/coursecategories', CourseCategoriesRoutes);
router.use('/serviceorder', ServiceOrderRouts);
router.use('/messaging', MessagingRouts);
router.use('/slider', SliderRoutes);





module.exports = router ;

