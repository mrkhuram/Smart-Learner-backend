const express = require('express');
const router = express.Router();

const CustomerController = require('../../../controllers/customer/customer');

router.post('/getcustomer', CustomerController.getCustomer); 


module.exports = router;