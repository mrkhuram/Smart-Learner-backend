const InstructorService = require('../../services/instructor');
const CourseService = require('../../services/course');



const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');




class InstructorController {

    async updateInstructor(req, res) {
        try {
            let id = req.param('id')
            let data = Object.assign({}, req.body);
            if (!data.email) throw new apiError.ValidationError('email', message.EMAIL_REQUIRED);
            if (!data.password) throw new apiError.ValidationError('password', message.PASSWORD_REQUIRED);

            data.email = data.email.toLowerCase();

            let getInstructor = await InstructorService.getInstructor({ _id: id });
            if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);

            let update_Instructor = await InstructorService.updateInstructor(id, data);

            return res.status(200).send(ResponseService.success({ instructor: update_Instructor }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async approveOneInstructor(req, res) {
        try {
            let id = req.param('id')

            let approved_instructor = await InstructorService.approveOneInstructor(id);

            return res.status(200).send(ResponseService.success({ instructor: approved_instructor }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async denyOneInstructor(req, res) {
        try {
            let id = req.param('id')

            let deny_instructor = await InstructorService.denyOneInstructor(id);

            return res.status(200).send(ResponseService.success({ instructor: deny_instructor }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async deleteInstructor(req, res) {
        try {
            let id = req.param('id')

            let getInstructor = await InstructorService.getInstructor({ _id: id });
            if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);

            let delete_instructor = await InstructorService.deleteInstructor({_id : id});

            return res.status(200).send(ResponseService.success({ Instructor: delete_instructor }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }


    async approveManyUser(req, res) {
        try {

            let data = Object.assign({}, req.body);

            let approved_All_instructor = await InstructorService.approveMultiInstructor(data.array);

            return res.status(200).send(ResponseService.success({ instructor: approved_All_instructor }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async denyManyInstructor(req, res) {
        try {
            let data = Object.assign({}, req.body);


            let deny_All_instructor = await InstructorService.denyMultiInstructor(data.array);

            return res.status(200).send(ResponseService.success({ instructor: deny_All_instructor }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }


    async getAll(req, res) {
        try {

            let status = req.param('status')


            let response
            if (status === '5') {
                response = await InstructorService.getAllVerified([1, 2, 5])
            }
            if (status !== '5') {
                response = await InstructorService.getAll({ status });
            }
            let courses_posted = 0
            for (let index = 0; index < response.length; index++) {
                const element = response[index];

                let _id = element._id
                let courses = await CourseService.getManyCourses({ institute_id: _id })
                console.log(courses);

                if (courses.length > 0) {
                    courses_posted++
                }

                element.courses_posted = courses_posted
            }


            return res.status(200).send(ResponseService.success({ Instructors: response }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async payFee(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstructor = await InstructorService.getInstructor({ _id: data.id });
            if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);
            let payable_amount = getInstructor.fee.payable_amount;
            let details = {
                paid_by: getInstructor.id,
                payable_amount: payable_amount,
                paid_amount: data.amount,
                transaction_id: data.transaction_id
            }

            let payFee = await FeeService.payfee(details);
            if (!payFee) throw new apiError.ValidationError('fee', message.FEE_NOT_PAID);
            if (payFee) {
                let update_details = {
                    fee: {
                        fee_id: payFee.id,
                        status: 2
                    }
                }
                var updated_institute_fee = await InstructorService.updateInstructor(update_details, { _id: getInstructor.id });
            }
            return res.status(200).send(ResponseService.success({ institute: updated_institute_fee }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }



    async changeActivityStatus(req, res) {
        try {
            let data = Object.assign({}, req.body)


            let updated_instructor = await InstructorService.updateStatus(data.user_id, data.status);

            return res.status(200).send(ResponseService.success({ Institute: updated_instructor }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }



}

module.exports = new InstructorController();