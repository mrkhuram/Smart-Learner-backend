const InstituteService = require('../../services/institute');
const CourseService = require('../../services/course');
const FeeService = require('../../services/fee');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');




class InstituteController {
    async updateInstitute(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.email) throw new apiError.ValidationError('email', message.EMAIL_REQUIRED);
            if (!data.password) throw new apiError.ValidationError('password', message.PASSWORD_REQUIRED);

            data.email = data.email.toLowerCase();

            let getInstitute = await InstituteService.getInstitute({ _id: data.id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);

            let update_Institute = await InstituteService.updateInstitute(data, { email: data.email });

            return res.status(200).send(ResponseService.success({ institute: update_Institute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async approveOneInstitute(req, res) {
        try {
            let id = req.param('id')
            let getInstitute = await InstituteService.getInstitute({ _id: id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);

            let approved_Institute = await InstituteService.approveOneInstitute(id);

            return res.status(200).send(ResponseService.success({ Institute: approved_Institute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async denyOneInstitute(req, res) {
        try {
            let id = req.param('id')

            let getInstitute = await InstituteService.getInstitute({ _id: id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);

            let deny_Institute = await InstituteService.denyOneInstitute(id);

            return res.status(200).send(ResponseService.success({ Institute: deny_Institute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }


    async approveAllUser(req, res) {
        try {
            // let id = req.param('id')

            let approved_All_Institute = await InstituteService.approveAllInstitute();

            return res.status(200).send(ResponseService.success({ Institute: approved_All_Institute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async denyAllInstitute(req, res) {
        try {

            let deny_All_Institute = await InstituteService.denyAllInstitute();

            return res.status(200).send(ResponseService.success({ Institute: deny_All_Institute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async denyMultiInstitute(req, res) {
        try {
            let data = Object.assign({}, req.body)


            let deny_All_Institute = await InstituteService.denyMultiInstitute(data.array);

            return res.status(200).send(ResponseService.success({ Institute: deny_All_Institute }));

        } catch (e) {
            return res.send(500).send(ResponseService.failure(e));
        }
    }
    async approveMultiInstitute(req, res) {
        try {
            let data = Object.assign({}, req.body)


            let deny_All_Institute = await InstituteService.approveMultiInstitute(data.array);

            return res.status(200).send(ResponseService.success({ Institute: deny_All_Institute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }



    async deleteInstitute(req, res) {
        try {
            let id = req.param('id')

            let getInstitute = await InstituteService.getInstitute({ _id: id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);

            let delete_institute = await InstituteService.deleteInstitute(id);

            return res.status(200).send(ResponseService.success({ Institute: delete_institute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getOneInstitute(req, res) {
        try {
            let id = req.param('id')

            let get_details = await InstituteService.getOneInstitute({ _id: id });

            get_details.password = undefined

            return res.status(200).send(ResponseService.success({ Institute: get_details }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getAll(req, res) {
        try {
            let status = req.param('status')

            let response
            if (status === '2') {
                response = await InstituteService.getAllVerified([2, 3, 4])
            }
            if (status !== '2') {
                response = await InstituteService.getAll({ status });
            }
            let courses_posted = 0
            for (let index = 0; index < response.length; index++) {
                const element = response[index];

                let _id = element._id
                console.log(_id.toString());

                let courses = await CourseService.getManyCourses({ institute_id: _id })
                console.log(courses);

                if (courses.length > 0) {
                    courses_posted++
                }

                element.courses_posted = courses_posted
            }



            return res.status(200).send(ResponseService.success({ Institute: response }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }



    async changeActivityStatus(req, res) {
        try {
            let data = Object.assign({}, req.body)


            let deny_All_Institute = await InstituteService.updateStatus(data.user_id, data.status);

            return res.status(200).send(ResponseService.success({ Institute: deny_All_Institute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }







}

module.exports = new InstituteController();