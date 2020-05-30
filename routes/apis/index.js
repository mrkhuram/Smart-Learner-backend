const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin')
const freelancerRoutes = require('./freelancer')
const instituteRoutes = require('./institute')
const instructorRoutes = require('./instructor') 
const CutomerRoutes = require('./customer')
 
router.use('/admin', adminRoutes);  
router.use('/freelancer', freelancerRoutes);    
router.use('/institute', instituteRoutes);        
router.use('/instructor', instructorRoutes);     
router.use('/customer', CutomerRoutes);      
        
  
     
module.exports = router;       