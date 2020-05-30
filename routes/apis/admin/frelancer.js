const express = require('express');
const router = express.Router();
const path = require("path").resolve; 

const FreelancerController = require('../../../controllers/admin/freelancer');


router.post('/getfreelancer', FreelancerController.getOneFreelancer);
router.post('/getfreelancers', FreelancerController.getFreelancers);
router.post('/getfreelancerslist', FreelancerController.getFreelancersList);
router.post('/updatefreelancer', FreelancerController.updatFreelancer);
router.post('/deleteFreelancer', FreelancerController.deleteFreelancer);
 
  
module.exports = router ;


