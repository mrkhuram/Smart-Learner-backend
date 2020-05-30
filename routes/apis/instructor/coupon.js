const express = require('express');
const router = express.Router();
const path = require("path").resolve;
const Discount_coupon = require('../../../controllers/instructor/extra_service')

router.post('/discount_coupon/new', Discount_coupon.addDiscountCoupon)



 
module.exports = router;
  