const ChapterService = require('../../services/chapter');

const mongoose = require('mongoose');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');



class ChapterController {

    async getChapter(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let criteria = {
                course_id: mongoose.Types.ObjectId(data.course_id),
                parent: null
            }
            let chapters = await ChapterService.getChapter(criteria)
            return res.status(200).send(ResponseService.success({ chapter: chapters }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getChapters(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstitute = await InstituteService.getInstitute({ _id: data.id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);
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
    async chapterProgress(req, res) {
        try {
            let data = Object.assign({}, req.body);

                let criteria = {
                    _id: data.chapter_id
                }

                let details = {
                    progress : data.progress
                }
            let updateChapter = await ChapterService.updateChapter(criteria, details);

            return res.status(200).send(ResponseService.success({progress: updateChapter.progress}))


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));

        }
    }

    async getTopics(req, res) {
        try {

            let data = Object.assign({}, req.body);

            let criteria = {
                parent: data.chapter_id,
            }
            let topics = await ChapterService.getChapters(criteria)
            return res.status(200).send(ResponseService.success({ topics: topics }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}


module.exports = new ChapterController();