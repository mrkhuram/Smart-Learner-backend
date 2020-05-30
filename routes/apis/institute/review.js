const express = require('express');
const router = express.Router();

const ReviewController = require('../../../controllers/institute/review');

router.get('/getonereview', ReviewController.getReview);
router.get('/getallreview', ReviewController.getAllReviews);


module.exports = router;