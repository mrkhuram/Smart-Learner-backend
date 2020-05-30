const express = require('express');
const router = express.Router();

const AuthRoutes = require('./auth');
const ServicesRoute = require('./services'); 
const FreelancerRoutes = require('./freelancer')
const WithdrawRoutes = require('./withdraw');

router.use('/auth', AuthRoutes); 
router.use('/freelancer', FreelancerRoutes); 
router.use('/services', ServicesRoute);  
router.use('/withdraw', WithdrawRoutes);  
 
  
module.exports = router; 
