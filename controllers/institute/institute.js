const InstituteService = require('../../services/institute');
const FeeService = require('../../services/fee');

const mongoose = require('mongoose');
const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');




class InstituteController {

    async getInstitute(req, res) {
        try {
            let data = Object.assign({}, req.body);


            if (!data.institute_id) throw new apiError.ValidationError('id', message.ID_REQUIRED);

            let getIntitute = await InstituteService.getOneInstitute({ _id: mongoose.Types.ObjectId(data.institute_id) });

            return res.status(200).send(ResponseService.success({ institute: getIntitute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async updateInstitute(req, res) {
        try {
 
            let data = Object.assign({}, req.body);
            if (!data.email) throw new apiError.ValidationError('email', message.EMAIL_REQUIRED);
            if (!data.password) throw new apiError.ValidationError('password', message.PASSWORD_REQUIRED);

            data.email = data.email.toLowerCase(); 

            let getInstitute = await InstituteService.getInstitute({ _id: data.id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);
            
            delete data.password
            delete data.email
            delete data.confirm_password
            

            let update_Institute = await InstituteService.updateInstitute({ _id: data.id }, data);
 
            return res.status(200).send(ResponseService.success({ institute: update_Institute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }


    async payFee(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let getInstitute = await InstituteService.getInstitute({ _id: data.id });
            if (!getInstitute) throw new apiError.ValidationError('email', message.ID_INVALID);
            let payable_amount = getInstitute.fee.payable_amount;
            let details = {
                paid_by: getInstitute.id,
                payable_amount: payable_amount,
                paid_amount: data.amount,
                transaction_id: data.transaction_id
            }

            let payFee = await FeeService.payfee(details);
            if(!payFee) throw new apiError.ValidationError('fee', message.FEE_NOT_PAID);
            if (payFee) {
                let update_details = {
                    fee: {
                        fee_id: payFee.id,
                        status: 2
                    }
                }
                var updated_institute_fee = await InstituteService.updateInstitute(update_details, { _id: getInstitute.id });
            }
            return res.status(200).send(ResponseService.success({ institute: updated_institute_fee }));
            
        } catch(e){
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}

module.exports = new InstituteController();