const express = require('express');
const router = express.Router();
const path = require("path").resolve;

const FreelancerController = require('../../../controllers/freelancer/freelancer');

const Upload = require('../../../common/multer');
// const Upload = require

router.post('/', Upload.any(), FreelancerController.updateFreelancer);

  
module.exports = router;
 