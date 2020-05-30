const InstructorService = require('../../services/instructor');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');




class InstructorController {

    async getInstructor(req, res) {
        try {
            let data = Object.assign({}, req.body);


            if (!data.id) throw new apiError.ValidationError('id', message.ID_REQUIRED);

            let getInstructor = await InstructorService.getInstructor({ _id: data.id });

            return res.status(200).send(ResponseService.success({ instructor: getInstructor }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

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
}

module.exports = new InstructorController();