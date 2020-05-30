const express = require('express');
const router = express.Router();
const path = require("path").resolve;

const InstructorController = require('../../../controllers/admin/instructor');
const Discount_coupon = require('../../../controllers/instructor/extra_service')
 
const Upload = require('../../../common/multer');
// const Upload = require
  

router.get('/approve', InstructorController.approveOneInstructor); 
router.post('/approve_multi', InstructorController.approveManyUser);
router.get('/deny', InstructorController.denyOneInstructor);  
router.post('/deny_multi', InstructorController.denyManyInstructor);  
router.get('/get_all', InstructorController.getAll);  
router.post('/change_activity_status', InstructorController.changeActivityStatus)
router.get('/delete_instructor', InstructorController.deleteInstructor)


  

module.exports = router;
   