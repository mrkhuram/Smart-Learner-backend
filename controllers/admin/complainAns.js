let passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path').resolve;
const config = require(path('config/constants'));
const rp = require('request-promise'); 

const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const instructorServices = require('../../services/instructor');
const ResponseService = require('../../common/response');
const ComplainAns = require('../../services/complainAns')
// const googleAuth = require('../../common/google-auth');

class ComplainAnsService {

    async addAnswer(req, res) {

        try {
            var data = Object.assign({}, req.body);
            const id = req.param('id')

            let idProfessor = await instructorServices.getInstructor({ _id: id })
            let idStudent = await ComplainAns.findStudent({ _id: id })
            let newObj
            if (idProfessor) {
                newObj = {
                    id: idProfessor._id,
                    name: idProfessor.name,
                    type: "professor",
                    picture: idProfessor.picture
                }
            }
            if(idStudent){
                newObj = {
                    id: idStudent._id,
                    name: idStudent.name,
                    type: "student",
                    picture: idStudent.picture
                }
            }
            let newData = Object.assign({complain_by: newObj}, data)


            let servicesData = await ComplainAns.createAns(newData)


            let response = {
                servicesData
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
            var arabic_letters = new RegExp("[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]|^[\0-\9]$");

            if (data.service_category_in_arabic) if (!arabic_letters.test(data.service_category_in_arabic)) throw new apiError.NoAlphabets('no alphabets in Arabics letters', messages.NO_ALPHABETS)

            let id = req.param('id')
            data.service_category_in_english = data.service_category_in_english.toLowerCase()

            if (!data.service_category_in_english) throw new apiError.ServiceCategoryRequired('service category', messages.SERVICE_CATEGORY_REQUIRED)

            data.parent_category = id
            let response = await AdminService.createServiceCategory(data)


            return res.status(200).send(ResponseService.success(response))


        } catch (error) {

            return res.status(err.status || 500).send(ResponseService.failure(error))
        }

    }

    async deleteService(req, res) {
        try {
            let id = req.param('id')

            // checking id

            let idTrue = await AdminService.isIdExist(id)

            if (!idTrue) throw new apiError.idNotExist('id_not_exist', messages.SERVICE_NOT_EXIST)

            // delete the service

            let response = await AdminService.deleteService(id)

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

module.exports = new ComplainAnsService;