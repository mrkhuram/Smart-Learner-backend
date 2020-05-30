const CourseService = require('../../services/course');
const InstructorService = require('../../services/instructor');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');

class CourseController {

    async addCourse(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.instructor_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            
            let getInstructor = await InstructorService.getInstructor({ _id: data.instructor_id });
            if (!getInstructor) throw new apiError.ValidationError('id', message.ID_INVALID);
            if (getInstructor.status == 1 || getInstructor.status == 2 ) throw new apiError.ValidationError('profile', message.PROFILE_IS_UNDER_REVIEW);

            let addCourse = await CourseService.createCourse(data);

            return res.status(200).send(ResponseService.success({ course: addCourse }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getCourse(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.instructor_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            let getInstructor = await InstructorService.getInstructor({ _id: data.instructor_id });
            if (!getInstructor) throw new apiError.ValidationError('id', message.ID_INVALID);
            if (getInstructor.status == 1 || getInstructor.status == 2 ) throw new apiError.ValidationError('profile', message.PROFILE_IS_UNDER_REVIEW);

            let criteria = {
                instructor_id: data.instructor_id,
                _id: data.id
            } 
            let course = await CourseService.getCourse(criteria)
            return res.status(200).send(ResponseService.success({ course: course }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async updateCourse(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.instructor_id) throw new apiError.ValidationError('id', message.ID_INVALID);
             
            delete data.institute_id;
            delete data.instructor_id;
            let criteria = {
                _id: data.id
            }
            let updateCourse = await CourseService.updateCourse(criteria, data)
            return res.status(200).send(ResponseService.success({ course: updateCourse }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}

module.exports = new CourseController;