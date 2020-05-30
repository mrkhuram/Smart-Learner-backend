const Review = require('../models/review');


class ReviewService {
    addReview(details) {
        return new Review(details).save();
    }

    getReviewforCustomer(criteria) {
        // return Review.find( { course_id: criteria.course_id},
        //     { customer :{customer_id: criteria.customer_id }   } )
        return Review.find({
            course_id: criteria.course_id,
            'customer.customer_id': criteria.customer_id
        })
    }

    getReview(criteria) {
        return Review.findOne(criteria);
    }

    getAllReview(criteria) {
        return Review.find(criteria);
    }
    updateReview(criteria, details) {
        return Review.findOneAndUpdate(criteria, details);
    }
    
}


module.exports = new ReviewService();