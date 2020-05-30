const CommentService = require('../../services/comment');
const CourseService = require('../../services/course');
const InstituteServices = require('../../services/institute');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class CommentController {
    async addComment(req, res) {

        let data = Object.assign({}, req.body);

        let getCourse = await CourseService.getCourse({ _id: data.course_id });
        if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

        let commentAdded = CommentService.addComment(data);

        return res.status(200).send(ResponseService.success({ comment: commentAdded }));
    } catch(e) {
        return res.send(500).send(ResponseService.failure(e));
    }

    async getComment(req, res) {

        let data = Object.assign({}, req.body);

        let getCourse = await CourseService.getCourse({ _id: data.course_id });
        if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

        let comment = CommentService.getOneComment({ _id: data._id });

        return res.status(200).send(ResponseService.success({ comment: comment }));
    } catch(e) {
        return res.send(500).send(ResponseService.failure(e));
    }

    async replyComment(req, res) {

        let data = Object.assign({}, req.body);

        let getCourse = await CourseService.getCourse({ _id: data.course_id });
        if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

        let replyComment = CommentService.replyComment({ _id: data._id }, data);

        return res.status(200).send(ResponseService.success({ reply: replyComment }));
    } catch(e) {
        return res.send(500).send(ResponseService.failure(e));
    }
    async getAllComment(req, res) {

        let data = Object.assign({}, req.body);

        let getCourse = await CourseService.getCourse({ _id: data.course_id });
        if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

        let allComment = CommentService.getAllcomment({ course_id: data.course_id });

        return res.status(200).send(ResponseService.success({ comment: allComment }));
    } catch(e) {
        return res.send(500).send(ResponseService.failure(e));
    }
    async deleteComment(req, res) {

        let data = Object.assign({}, req.body);

        let getCourse = await CourseService.getCourse({ _id: data.course_id });
        if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);
        let getInstitute = await InstituteServices.getInstitute({ _id: data.instructor_id })
        if (!getInstitute) throw new apiError.ValidationError('id', message.ID_INVALID);

        let deletedComment = CommentService.deleteComment({ _id: data._id });

        return res.status(200).send(ResponseService.success({ comment: deletedComment }));
    } catch(e) {
        return res.send(500).send(ResponseService.failure(e));
    }

    async getRpliedComment(req, res) {
        let data = Object.assign({}, req.body);

        let getCourse = await CourseService.getCourse({ _id: data.course_id });
        if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

        let count = 0
        let getAllComment = await CommentService.getAllComment(condition);
        for(let i = 0; i< getAllComment.length; i++){
            if(getAllComment[i].reply_by != '' || getAllComment[i].reply_by != undefined){
                count ++ ;
            }
        }
        return res.status(200).send(ResponseService.success({ comment: count }));
    } catch(e) {
        return res.send(500).send(ResponseService.failure(e));
    }

    async getUnRpliedComment(req, res) {
        let data = Object.assign({}, req.body);

        let getCourse = await CourseService.getCourse({ _id: data.course_id });
        if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);

        let condition = {
            reply: [
                { reply_by: '' }
            ],
            course_id: data.course_id

        }
        let getUnRpliedComment = await CommentService.getUnReplied(condition);

        return res.status(200).send(ResponseService.success({ comment: getUnRpliedComment }));
    } catch(e) {
        return res.send(500).send(ResponseService.failure(e));
    }
}

module.exports = new CommentController();