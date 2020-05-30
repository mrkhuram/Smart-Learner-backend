const ReviewService = require('../../services/review');
const CourseService = require('../../services/course');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class ReviewController {
    async getReview(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCourse = await CourseService.getCourse({ _id: data.course_id });
            if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);
            let criteria = {
                _id: data.course_id
            }
            let review = ReviewService.getReview(criteria);

            return res.status(200).send(ResponseService.success({ review: review }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getAllReviews(req, res) {

        let data = Object.assign({}, req.body);
        try {

            let getCourse = await CourseService.getCourse({ _id: data.course_id });
            if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);
            let criteria = {
                _id: data.course_id
            }
            let review = ReviewService.getAllReview(criteria);

            return res.status(200).send(ResponseService.success({ review: review }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}

module.exports = new ReviewController();