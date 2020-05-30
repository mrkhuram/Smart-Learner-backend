let passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path').resolve;
const config = require(path('config/constants'));
const rp = require('request-promise');

const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const AuthService = require('../../services/auth');
const ResponseService = require('../../common/response');
const DegreeService = require('../../services/degree')
// const DegreeCategory = require('../../services/degreeCategory');

class ServicesController {



    async addNewDegree(req, res) {

        try {
            var arabic_letters = new RegExp("[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]|^[\0-\9]$");

            var data = Object.assign({}, req.body);
            const type = this.getUserType(req.baseUrl)

            if (!arabic_letters.test(data.degree_name_in_arabic)) throw new apiError.NoAlphabets('no alphabets in Arabics letters', messages.NO_ALPHABETS)


            if (!arabic_letters.test(data.arabic_subjects[0].subject_name)) throw new apiError.NoAlphabets('no alphabets in array', messages.NO_ALPHABETS)

            if (!data.degree_name_in_english) throw new apiError.DegreeNameIsRequired('degree_name', messages.DEGREE_NAME_REQUIRED)
            data.degree_name_in_english = data.degree_name_in_english.toLowerCase()


            // is name already exist 


            let name = await DegreeService.degreeExist({ degree_name_in_english: data.degree_name_in_english })


            if (name) throw new apiError.DegreeNameExist('degree_name', messages.DEGREE_NAME_EXIST)


            // Create new Services
            let degree = await DegreeService.createDegree(data)

            // checking array




            let response = {
                degree
                // subjects: data.subjects
            }


            return res.status(200).send(ResponseService.success(response));

        } catch (err) {
            return res.status(err.status || 500).send(ResponseService.failure(err));
        }
    }


    async add_new_subject(req, res) {

        //  add new subject to an existed service 

        try {
            let data = Object.assign({}, req.body)

            let id = req.param('id')
            var arabic_letters = new RegExp("[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]|^[\0-\9]$");

            if (data.arabic_subjects) if (!arabic_letters.test(data.arabic_subjects[0].subject_name)) throw new apiError.NoAlphabets('no alphabets in Arabics letters', messages.NO_ALPHABETS)

            // data.subject_in_english = data.subject_in_english.toLowerCase()
            // checking id exist or not

            let idExist = await DegreeService.checkingDegreeId({ _id: id })
            if (!idExist) throw new apiError.DEGREE_NOT_EXIST('degree does not exist', messages.DEGREE_NOT_EXIST)


            // data.parent_category = id 
            let response = await DegreeService.pushNewSubject(id, data)


            return res.status(200).send(ResponseService.success(response))


        } catch (error) {

            return res.status(error.status || 500).send(ResponseService.failure(error))
        }

    }

    async deleteDegree(req, res) {
        try {
            // let id = req.param('id')
            let data = Object.assign({}, req.body)

            // delete the degree with its subject

            let response = await DegreeService.deleteDegree(data.id)

            return res.status(200).send(ResponseService.success(response))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }

    async getOneDegree(req, res) {
        try {
            let id = req.param('id')

            // get degree id

            let degree = await DegreeService.checkingDegreeId({ _id: id })
            // let subjects = await DegreeService.subjectExist({parent_category: id })

            // let resp = { degree}

            return res.status(200).send(ResponseService.success(degree))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }
    async deleteSubject(req, res) {
        try {
            let data = Object.assign({}, req.body)
            let response = await DegreeService.deleteSubject(data.id, data.delete_from)

            delete response.opTime
            delete response.electionId
            delete response.$clusterTime
            delete response.operationTime

            return res.status(200).send(ResponseService.success(response))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }
    async getAllDegree(req, res) {
        try {


            // get degree id

            let degree = await DegreeService.getAllDegrees()

            return res.status(200).send(ResponseService.success(degree))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }

    async addNewDegreeCategory(req, res) {
        try {
            let data = Object.assign({}, req.body)
            let response = await DegreeService.insertDegreeCategory(data.id, data.delete_from)

            delete response.opTime
            delete response.electionId
            delete response.$clusterTime
            delete response.operationTime

            return res.status(200).send(ResponseService.success(response))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }

    getUserType(url) {
        let type = url.split('/')[2];

        switch (type) {
            case 'admin':
                return 1;
            case 'freelancer':
                return 2;
            case 'instructor':
                return 3;
            case 'institute':
                return 4;
            case 'customer':
                return 5
            default:
                return 0;
        }
    }
}

module.exports = new ServicesController;