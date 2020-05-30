const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth');
const InstituteRoutes = require('./institute');
const CourseRoutes = require('./course');
const ChapterRoutes = require('./chapter');
const ReviewRoutes = require('./review');
const EventRoutes = require('./event');
const DiscountRoutes = require('./coupon');
const DegreeRoutes = require('./degree');
const WithdrawRoutes = require('./withdraw');

 
        
router.use('/auth', AuthRoutes);       
router.use('/institute', InstituteRoutes);     
router.use('/course', CourseRoutes);  
router.use('/chapter', ChapterRoutes);  
router.use('/review', ReviewRoutes); 
router.use('/event', EventRoutes); 
router.use('/discount_coupon', DiscountRoutes);
router.use('/degree', DegreeRoutes) 
router.use('/withdraw', WithdrawRoutes)
  
 



module.exports = router;
