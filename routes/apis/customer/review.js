const express = require('express');
const router = express.Router();

const ReviewController = require('../../../controllers/customer/review');
 
router.post('/addreview', ReviewController.addReview);
router.post('/getcutomerreview', ReviewController.getCustomerReview);
router.post('/updatereview', ReviewController.updateReview);
router.post('/getinstructorreview', ReviewController.getInstructorReviews);
router.post('/getcoursereview', ReviewController.getCourseReviews);
router.post('/getFreelancerservicereviews', ReviewController.getFreelancerServiceReviews);




module.exports = router;