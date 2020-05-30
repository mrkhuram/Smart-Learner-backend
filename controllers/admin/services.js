let passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path').resolve;
const config = require(path('config/constants'));
const rp = require('request-promise');

const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');
const AuthService = require('../../services/auth');
const Service = require('../../services/services')
// const googleAuth = require('../../common/google-auth');

class ServicesController {



    async addNewService(req, res) {

        try {

            var arabic_letters = new RegExp("[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]|^[\0-\9]$");
            var data = Object.assign({}, req.body);
            const type = this.getUserType(req.baseUrl)

            if (data.name_in_arabic) if (!arabic_letters.test(data.name_in_arabic)) throw new apiError.NoAlphabets('No alphabets in Arabics letters', messages.NO_ALPHABETS)

            if (!data.name_in_english) throw new apiError.ServicesNameError('service_name', messages.SERVICE_NAME_REQUIRED)

            data.name_in_english = data.name_in_english.toLowerCase()


            // is name already exist 
            let name_in_arabic
            if (data.name_in_arabic) { name_in_arabic = await Service.isExist({ name_in_arabic: data.name_in_arabic }) }
            if (name_in_arabic) throw new apiError.ServiceAlreadyExist('service_name_in_arabic_already_exist', messages.SERVICE_NAME_EXIST)


            let name_in_english = await Service.isExist({ name_in_english: data.name_in_english })
            if (name_in_english) throw new apiError.ServiceAlreadyExist('service_name_in_english_already_exist', messages.SERVICE_NAME_EXIST)

            // Create new Services

            let responseData = await Service.createService(data)


            let response = {
                responseData
            }
            return res.status(200).send(ResponseService.success(response));

        } catch (err) {
            return res.status(err.status || 500).send(ResponseService.failure(err));
        }
    }


    async add_new_category(req, res) {

        //  add new category to an existed service

        try {
            let data = Object.assign({}, req.body)
            let id = req.param('id')
            let eng_cate = [{
                service_name: data.english_categories,
                service_image: req.files.length > 0 ?  req.files[0].filename : ''
            }]
            let arab_cate = [{
                service_name: data.arabic_categories,
                service_image:  req.files.length > 0 ? req.files[0].filename : ""
            }]
            let newData = {
                english_categories: eng_cate,
                arabic_categories: arab_cate
            }
            var arabic_letters = new RegExp("[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]|^[\0-\9]$");


            let idExist = await Service.isExist({ _id: id })
            if (!idExist) throw new apiError.ServiceAlreadyExist('service_not_exist', messages.SERVICE_NOT_EXIST)

            if (data.arabic_categories) if (!arabic_letters.test(arab_cate[0].service_name)) throw new apiError.NoAlphabets('no alphabets in Arabics letters', messages.NO_ALPHABETS)




            let response = await Service.createServiceCategory(id, newData)


            return res.status(200).send(ResponseService.success(response))


        } catch (error) {

            return res.status(error.status || 500).send(ResponseService.failure(error))
        }

    }

    async deleteService(req, res) {
        try {
            // let id = req.param('id')
            let data = Object.assign({}, req.body)

            let response = await Service.deleteService(data.id)
            delete response.opTime
            delete response.electionId
            delete response.$clusterTime
            delete response.operationTime


            return res.status(200).send(ResponseService.success(response))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }
    async deleteCategory(req, res) {
        try {
            let data = Object.assign({}, req.body)
            let response = await Service.deleteCategory(data.id, data.delete_from)
            delete response.opTime
            delete response.electionId
            delete response.$clusterTime
            delete response.operationTime

            return res.status(200).send(ResponseService.success(response))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }
    async getAll(req, res) {
        try {
            // get all the service

            let response = await Service.getAllServices()

            return res.status(200).send(ResponseService.success(response))


        } catch (error) {
            return res.status(error.status || 500).send(ResponseService.success(error))
        }
    }
    async getOne(req, res) {
        try {
            let id = req.param('id')

            // checking id

            let idTrue = await Service.isIdExist(id)

            if (!idTrue) throw new apiError.idNotExist('id_not_exist', messages.SERVICE_NOT_EXIST)
            // let categories = await Service.findCategory({ parent: id })

            let resp = {
                idTrue,
                // categories
            }
            return res.status(200).send(ResponseService.success(resp))


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