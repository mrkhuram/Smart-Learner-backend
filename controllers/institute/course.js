const CourseService = require('../../services/course');
const InstituteService = require('../../services/institute');
const InstructorService = require('../../services/instructor');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class CourseController {

    async addCourse(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let files = req.files
             if(files){ 

                 files.forEach(item => {
                     if(item.fieldname === "promo_video"){
                         data.promo_video = item.filename
                        }
                        if(item.fieldname === "thumbnail"){
                            data.thumbnail = item.filename
                        }
                    });
                }
            
            if (!data.institute_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            let getInstitute = await InstituteService.getInstitute({ _id: data.institute_id });
            if (!getInstitute) throw new apiError.ValidationError('id', message.ID_INVALID);
            if (getInstitute.status == 1 || getInstitute.status == 2) throw new apiError.ValidationError('profile', message.PROFILE_IS_UNDER_REVIEW);


            let addCourse = await CourseService.createCourse(data);

            return res.status(200).send(ResponseService.success({ course: addCourse }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getCourse(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.institute_id) throw new apiError.ValidationError('id', message.ID_INVALID);
            let criteria = {
                institute_id: data.institute_id,
                _id: data.id
            }  
            let course = await CourseService.getCourse(criteria)

            return res.status(200).send(ResponseService.success({ course: course }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getAllCourses(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.institute_id) throw new apiError.ValidationError('id', message.ID_INVALID);
            let criteria = {
                institute_id: data.institute_id,
            }  
            let course = await CourseService.getAllCourse(criteria)

            return res.status(200).send(ResponseService.success({ course: course }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async updateCourse(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.institute_id) throw new apiError.ValidationError('id', message.ID_INVALID);
             
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