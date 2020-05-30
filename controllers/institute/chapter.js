const ChapterService = require('../../services/chapter');
const InstituteService = require('../../services/institute');
const InstrctorService = require('../../services/instructor');

const mongoose = require('mongoose')

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');

class ChapterController {
    async addChapter(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getInstitute = await InstituteService.getInstitute({ _id: data.provider_id });
            if (!getInstitute) {
                let getInstructor = await InstrctorService.getInstructor({ _id: data.provider_id })
                if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);
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
            let getInstitute = await InstituteService.getInstitute({ _id: data.provider_id });

            if (req.files) {
                req.files.forEach(element => {
                    if (element.fieldname === 'video') {
                        data.video = element.filename === "null" ? null : element.filename
                    }
                    if (element.fieldname === 'file') {
                        data.file = element.filename === "null" ? null : element.filename
                    }

                });
            }
            data.video = data.video === "null" ? null : data.video
            data.file = data.file === "null" ? null : data.file

            if (!getInstitute) {
                let getInstructor = await InstrctorService.getInstructor({ _id: data.provider_id });
                if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);
            }

            let criteria = {
                _id: data.id,
            }
            delete data.id;
            delete data.provider_id
            delete data.parent
            if (data.english_name === 'null') {
                delete data.english_name
            }
            let updatedChapter = await ChapterService.updateChapter(criteria, data);
            return res.status(200).send(ResponseService.success({ chapter: updatedChapter }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getOneChapter(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstitute = await InstituteService.getInstitute({ _id: data.provider_id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);
            let criteria = {
                provider_id: data.provider_id,
                course_id: data.course_id,

            }
            let getChapter = await ChapterService.getChapter(criteria);
            return res.status(200).send(ResponseService.success({ chapter: getChapter }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getChapters(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstitute = await InstituteService.getInstitute({ _id: data.provider_id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);
            let criteria = {
                provider_id: data.provider_id,
                course_id: data.course_id,
                parent: null
            }
            // parent = chapterid

            let getChapters = await ChapterService.getChapters(criteria);

            let newResp = []

            for (let i = 0; i < getChapters.length; i++) {
                let criteria2 = {
                    parent: getChapters[i]._id
                }
                let getTopics = await ChapterService.getChapters(criteria2);

                getChapters[i].topics = getTopics


            }
            console.log(newResp);


            return res.status(200).send(ResponseService.success({ chapter: getChapters }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async deleteChapter(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstitute = await InstituteService.getInstitute({ _id: data.id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);
            let criteria = {
                _id: data.id,
                course_id: data.course_id, 

            }
            let deletedChapter = await ChapterService.deleteChapter(criteria);
            return res.status(200).send(ResponseService.success({ chapter: deletedChapter }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }


    
    async deleteTopic(req, res) {
        try {
            let id = req.param('id')
            
            let deletedChapter = await ChapterService.deleteChapter({_id: id}); 
            return res.status(200).send(ResponseService.success({ chapter: deletedChapter }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}

module.exports = new ChapterController();