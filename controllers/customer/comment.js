const CommentService = require('../../services/comment');
const CourseService = require('../../services/course');
const CustomerService = require('../../services/customer');
const InstructorService = require('../../services/instructor'); 

const mongoose = require('mongoose');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class CommentController {
    async addComment(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCourse = await CourseService.getCourse({ _id: data.course_id });
            if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

            let customer = await CustomerService.getCustomer({ _id: data.customer_id });
            let details = {
                customer: {
                    customer_id: customer._id,
                    customer_name: customer.name,
                    picture: customer.picture
                },
                course_id: mongoose.Types.ObjectId(data.course_id),
                topic_id: mongoose.Types.ObjectId(data.topic_id),
                body: data.body
            }

            let commentAdded = CommentService.addComment(details);
            

            return res.status(200).send(ResponseService.success({ comment: commentAdded }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getComment(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCourse = await CourseService.getCourse({ _id: data.course_id });
            if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

            let comment = CommentService.getOneComment({ _id: data.id });

            return res.status(200).send(ResponseService.success({ comment: comment }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async replyComment(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCourse = await CourseService.getCourse({ _id: data.course_id });
            if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);
            let user
             user = await CustomerService.getManyCutomers({ _id: data.reply_by });
            if(!user) user = await InstructorService.getAllComment({_id: data.reply_by})
            let details = {
                reply: {
                    reply_by: user.id,
                    user_name: user.name,
                    user_picture: user.picture,
                    reply_body: data.reply
                },
                
            }

            let replyComment = CommentService.replyComment({ _id: data.id }, details);

            return res.status(200).send(ResponseService.success({ reply: replyComment }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getAllComment(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let course_id = mongoose.Types.ObjectId(data.course_id);
            console.log(course_id)
            let getCourse = await CourseService.getCourse({ _id: course_id });
            if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

            let allComment = CommentService.getAllcomment({ topic_id: data.topic_id });

            return res.status(200).send(ResponseService.success({ comment: allComment }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}

module.exports = new CommentController();