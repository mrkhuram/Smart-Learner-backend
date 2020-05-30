const express = require('express');
const router = express.Router();
const path = require("path").resolve; 

const InstituteController = require('../../../controllers/institute/institute');
const FeePayment = require('../../../controllers/common/stripe');


const Upload = require('../../../common/multer');
// const Upload = require

router.post('/', Upload.any(), InstituteController.updateInstitute); 
router.post('/getinstitute', InstituteController.getInstitute);
router.post('/payfee', FeePayment.feepayment);   
   

module.exports = router;
  