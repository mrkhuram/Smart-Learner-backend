const express = require('express');
const router = express.Router();
const path = require("path").resolve; 

const FreelanceServiceController = require('../../../controllers/admin/freelanceService');


router.post('/getservice', FreelanceServiceController.getOneService); 
router.post('/getservices', FreelanceServiceController.getAllServices);
router.post('/updateservice', FreelanceServiceController.updateService);
router.post('/deleteservice', FreelanceServiceController.deleteService);


module.exports = router ;


