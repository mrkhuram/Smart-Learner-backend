const express = require('express');
const router = express.Router();
const path = require("path").resolve;
const Discount_coupon = require('../../../controllers/institute/discount_coupon')

router.post('/new', Discount_coupon.addDiscountCoupon)  

 

  
module.exports = router;
  