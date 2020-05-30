const AdminService = require('../../services/admin');
const FreelanceService = require('../../services/FreelanceService');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');

class FreelanceServiceController {

    async getOneService(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let Admin = await AdminService.getAdmin({ _id: data.user_id });
            if (!Admin) throw new apiError.ValidationError('admin', message.ID_INVALID);

            delete data.user_id

            let criteria = {
                service_provider: data.freelancer_id
            }

            let service = await FreelanceService.getOneService(criteria)

            return res.status(200).send(ResponseService.success({ 'service': service }));

        } catch (e) {
            return res.status(err.status || 500).send(ResponseService.failure(err));

        }
    }
    async getAllServices(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let Admin = await AdminService.getAdmin({ _id: data.user_id });
            if (!Admin) throw new apiError.ValidationError('admin', message.ID_INVALID);

            delete data.user_id

            let criteria = {
                service_provider: data.freelancer_id
            }

            let allServices = await FreelanceService.getAllServices(criteria)

            return res.status(200).send(ResponseService.success({ 'services': allServices }));

        } catch (e) {
            return res.status(err.status || 500).send(ResponseService.failure(err));

        }
    }

    async updateService(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let Admin = await AdminService.getAdmin({ _id: data.user_id });
            if (!Admin) throw new apiError.ValidationError('admin', message.ID_INVALID);

            delete data.user_id

            let criteria = {
                _id: data.service_id
            }
            let updatedService = await FreelanceService.updateService(criteria, data)

            return res.status(200).send(ResponseService.success({ 'service': updatedService }));

        } catch (e) {
            return res.status(err.status || 500).send(ResponseService.failure(err));

        }
    }
    async deleteService(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let Admin = await AdminService.getAdmin({ _id: data.user_id });
            if (!Admin) throw new apiError.ValidationError('admin', message.ID_INVALID);

            delete data.user_id

            let criteria = {
                _id: data.service_id
            }
            let deletedService = await FreelanceService.deleteOneService(criteria, data)

            return res.status(200).send(ResponseService.success({ 'delete': deletedService }));

        } catch (e) {
            return res.status(err.status || 500).send(ResponseService.failure(err));

        }
    }
};


module.exports = new FreelanceServiceController();
