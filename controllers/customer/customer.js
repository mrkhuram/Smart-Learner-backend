const CustomerService = require('../../services/customer');

let mongoose = require('mongoose');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


 

class CustomerController {

    async getCustomer(req, res) {
        try {
            let data = Object.assign({}, req.body);

            //Set criteria according to your requirements
            let criteria = {
                _id: mongoose.Types.ObjectId(data.cutomer_id)
            }
            let getCustomer = await CustomerService.getCustomer(criteria)
            return res.status(200).send(ResponseService.success({ customer: getCustomer }));

        } catch (e) {
            return res.status(e || 200).send(ResponseService.failure(e));
        }
    }
}

module.exports = new CustomerController();