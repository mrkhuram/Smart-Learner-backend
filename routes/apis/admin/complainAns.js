const express = require('express');
const router = express.Router();

const ComplainAnsService = require('../../../controllers/admin/complainAns'); 
 
router.post('/answer', ComplainAnsService.addAnswer.bind(ComplainAnsService))
// router.post('/add_new_category',  ComplainAnsService.add_new_category.bind(ComplainAnsService))
// router.get('/delete_service',  ComplainAnsService.deleteService.bind(ComplainAnsService))
 
module.exports = router;        