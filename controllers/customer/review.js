const ReviewService = require('../../services/review');
const CourseService = require('../../services/course');
const CustomerService = require('../../services/customer');

const mongoose = require('mongoose');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class ReviewController {
    async addReview(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCustomer = await CustomerService.getCustomer({ _id: mongoose.Types.ObjectId(data.customer_id) });
            if (!getCustomer) throw new apiError.ValidationError('id', message.ID_INVALID);
            if (data.course_id) {
                let criteria1 = {

                    customer_id: mongoose.Types.ObjectId(getCustomer.id),

                    course_id: mongoose.Types.ObjectId(data.course_id)
                }
                let getReview = await ReviewService.getReviewforCustomer(criteria1)
                if (getReview.length > 0) throw new apiError.ValidationError('Review', message.ALREADY_EXIST);
            } else {
                let criteria2 = {
                    customer_id: mongoose.Types.ObjectId(getCustomer.id),

                    service_id: data.service_id
                }
                let getReview_2 = await ReviewService.getReview(criteria2)
                if (getReview_2.length > 0) throw new apiError.ValidationError('Review', message.ALREADY_EXIST);
            }

            data.customer = {
                customer_id: getCustomer.id,
                customer_name: getCustomer.name,
                customer_picture: getCustomer.picture
            }

            let reviewAdded = await ReviewService.addReview(data);

            return res.status(200).send(ResponseService.success({ review: reviewAdded }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async updateReview(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getCustomer = await CustomerService.getCustomer({ _id: mongoose.Types.ObjectId(data.customer_id) });
            if (!getCustomer) throw new apiError.ValidationError('id', message.ID_INVALID);
            if (!data.review_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            let criteria = {
                _id: data.review_id
            }

            let updatereview = await ReviewService.updateReview(criteria, data)

            return res.status(200).send(ResponseService.success({ review: updatereview }));



        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));
        }
    }
    async getCustomerReview(req, res) {
        try {
 
            let data = Object.assign({}, req.body);
            // let  instructor_id = JSON.parse(data.instructor_id);

            let criteria = {
                customer_id: mongoose.Types.ObjectId(data.customer_id),
                course_id: mongoose.Types.ObjectId(data.course_id)
            }

            let customerReview = await ReviewService.getReviewforCustomer(criteria);
            // let star = 0;
            // for(let i =0; i < instructorReviews.length; i++){
            //     star += instructorReviews[i].star
            // }

            // let averageStar = star / 5

            // console.log(averageStar);

            return res.status(200).send(ResponseService.success({ review: customerReview }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getInstructorReviews(req, res) {
        try {

            let data = Object.assign({}, req.body);
            // let  instructor_id = JSON.parse(data.instructor_id);

            let criteria = {
                instructor_id: mongoose.Types.ObjectId(data.instructor_id)
            }

            let instructorReviews = await ReviewService.getAllReview(criteria);
            // let star = 0;
            // for(let i =0; i < instructorReviews.length; i++){
            //     star += instructorReviews[i].star
            // }

            // let averageStar = star / 5

            // console.log(averageStar);

            return res.status(200).send(ResponseService.success({ review: instructorReviews }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getCourseReviews(req, res) {
        try {

            let data = Object.assign({}, req.body);
            let courseId = mongoose.Types.ObjectId(data.course_id)
            let getCourse = await CourseService.getCourse({ _id: courseId });
            if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

            let criteria = {
                course_id: courseId
            }

            let courseReviews = await ReviewService.getAllReview(criteria)

            return res.status(200).send(ResponseService.success({ review: courseReviews }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getFreelancerServiceReviews(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let service_id = mongoose.Types.ObjectId(data.service_id)

            let criteria = {
                service_id: service_id
            }

            let ServiceReview = await ReviewService.getAllReview(criteria)

            return res.status(200).send(ResponseService.success({ review: ServiceReview }));
        } catch (e) {

            return res.status(500).send(ResponseService.failure(e));

        }
    }



}

module.exports = new ReviewController();