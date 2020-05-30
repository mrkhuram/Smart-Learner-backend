const express = require('express');
const router = express.Router();

const FreelancerController = require('../../../controllers/customer/freelancer');


router.post('/getfreelancer', FreelancerController.getFreelancer )


module.exports = router 


