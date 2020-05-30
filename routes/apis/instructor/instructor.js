const express = require('express');
const router = express.Router();
const path = require("path").resolve;

const InstructorController = require('../../../controllers/instructor/instructor');
const FeePayment = require('../../../controllers/common/stripe');
 
const Upload = require('../../../common/multer');
// const Upload = require
  
router.post('/', Upload.any(), InstructorController.updateInstructor); 
router.post('/getinstructor', InstructorController.getInstructor);

router.post('/payfee', FeePayment.feepayment); 


module.exports = router;
   