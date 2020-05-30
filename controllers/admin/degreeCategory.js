let passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path').resolve;
const config = require(path('config/constants'));
const rp = require('request-promise');

const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const AuthService = require('../../services/auth');
const ResponseService = require('../../common/response');
// const DegreeService = require('../../services/degree')
const DegreeCategory = require('../../services/degreeCategory');

class ServicesController {

    async addNewDegreeCategory(req, res) {
        try {
            let data = Object.assign({}, req.body)

            let englishCategory = await DegreeCategory.degreeExist({ english_category: data.english_category })
            if (englishCategory) throw new apiError.EnglishCategoryExist('english category exist', messages.ENGLISH_CATEGORY_EXIST)


            let arabicCategory = await DegreeCategory.degreeExist({ arabic_category: data.arabic_category })
            if (arabicCategory) throw new apiError.ArabicCategoryExist('arabic category exist', messages.ARABIC_CATEGORY_EXIST)


            let response = await DegreeCategory.insertDegreeCategory(data)


            return res.status(200).send(ResponseService.success(response))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }


    async deleteDegreeCategory(req, res) {
        try {
            // let id = req.param('id')
            let data = Object.assign({}, req.body)

            // delete the degree with its subject

            let response = await DegreeCategory.deleteDegree(data.id)

            delete response.opTime
            delete response.electionId
            delete response.$clusterTime
            delete response.operationTime


            return res.status(200).send(ResponseService.success(response))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }


    async getAllDegreeCategory(req, res) {
        try {


            // get degree id

            let degree = await DegreeCategory.getAllDegrees()
           

            return res.status(200).send(ResponseService.success(degree))


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