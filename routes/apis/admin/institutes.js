const express = require('express');
const router = express.Router();
const path = require("path").resolve;

const InstituteController = require('../../../controllers/admin/institute');
const Discount_coupon = require('../../../controllers/instructor/extra_service')
 
const Upload = require('../../../common/multer');
// const Upload = require
    

router.get('/approve', InstituteController.approveOneInstitute); 
router.get('/approve_all', InstituteController.approveAllUser);
router.get('/deny', InstituteController.denyOneInstitute);  
router.get('/deny_all', InstituteController.denyAllInstitute);  
router.post('/deny_multi', InstituteController.denyMultiInstitute); 
router.post('/approve_multi', InstituteController.approveMultiInstitute); 
router.get('/delete_institute', InstituteController.deleteInstitute); 
router.get('/get_details', InstituteController.getOneInstitute);  
router.get('/get_all', InstituteController.getAll);      
router.post('/change_activity_status', InstituteController.changeActivityStatus); 

     

 



module.exports = router;
  