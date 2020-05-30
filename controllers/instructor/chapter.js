const ChapterService = require('../../services/chapter');
const InstructorService = require('../../services/instructor');
const InstituteService = require('../../services/institute');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');

class ChapterController {
    async addChapter(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstructor = await InstructorService.getInstructor({ _id: data.provider_id });
            if (!getInstructor) {
                let getInstitute = await InstituteService.getInstitute({ _id: data.provider_id })
                if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);
            }

            let addedChapter = await ChapterService.addChapter(data);
            return res.status(200).send(ResponseService.success({ chapter: addedChapter }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async updateChapter(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstructor = await InstructorService.getInstructor({ _id: data.id });
            if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);
            let criteria = {
                _id: data.id,
                course_id: data.course_id,

            }
            delete data.course_id;
            delete data._id;
            delete data.provider_id
            let updatedChapter = await ChapterService.updateChapter(criteria, data);
            return res.status(200).send(ResponseService.success({ chapter: updatedChapter }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getOneChapter(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstructor = await InstructorService.getInstructor({ _id: data.id });
            if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);
            let criteria = {
                _id: data.id,
                course_id: data.course_id,

            }
            let getChapter = await ChapterService.getOneChapter(criteria);
            return res.status(200).send(ResponseService.success({ chapter: getChapter }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getChapters(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstructor = await InstructorService.getInstructor({ _id: data.id });
            if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);
            let criteria = {
                _id: data.id,
                course_id: data.course_id,

            }
            let getChapters = await ChapterService.getChapters(criteria);
            return res.status(200).send(ResponseService.success({ chapter: getChapters }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async deleteChapter(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstructor = await InstructorService.getInstructor({ _id: data.id });
            if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);
            let criteria = {
                _id: data.id,
                course_id: data.course_id,

            }
            let deletedChapter = await ChapterService.updateChapter(criteria);
            return res.status(200).send(ResponseService.success({ chapter: deletedChapter }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}

module.exports = new ChapterController();