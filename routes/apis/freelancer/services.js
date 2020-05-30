const express = require('express');
const router = express.Router();
const path = require("path").resolve;

const FreelancerServicesController = require('../../../controllers/freelancer/service')
 
const Upload = require('../../../common/multer');
// const Upload = require 

router.post('/createservice', Upload.any(),FreelancerServicesController.createService);
router.post('/getservice', FreelancerServicesController.getService);
router.post('/getallservices', FreelancerServicesController.getAllServices); 
router.post('/updateservice', Upload.any(),FreelancerServicesController.updateService);   
// router.post('getservice', FreelancerServicesController.getService);
// router.post('getallservices', FreelancerServicesController.getAllServices);
// router.post('updateservice', FreelancerServicesController.updateService); 



router.post('/getmainservices', FreelancerServicesController.getAllMainServices); 
router.post('/getservicecategories', FreelancerServicesController.getServiceCategories);
 
   
module.exports = router;
 