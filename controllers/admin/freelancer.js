const AdminService = require('../../services/admin');
const FreelancerService = require('../../services/freelancer');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');



class FreelancerController {
    async getOneFreelancer(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let Admin = await AdminService.getAdmin({ _id: data.user_id });
            if (!Admin) throw new apiError.ValidationError('admin', message.ID_INVALID);

            delete data.user_id

            let criteria = {
                _id: data.freelancer_id
            }

            let freelancer = await FreelancerService.getFreelancer(criteria)

            return res.status(200).send(ResponseService.success({ 'freelancer': freelancer }));

        } catch (err) {
            return res.status(err.status || 500).send(ResponseService.failure(err));

        }
    }

    async getFreelancers(req, res) { 
        try {
            let data = Object.assign({}, req.body);

            let Admin = await AdminService.getAdmin({ _id: data.user_id });
            if (!Admin) throw new apiError.ValidationError('admin', message.ID_INVALID);


            let criteria = {
                _id: data.freelancer_id 
            }

            let freelancers = await FreelancerService.getFreelancers(criteria)

            return res.status(200).send(ResponseService.success({ 'freelancer': freelancers }));

        } catch (err) {
            return res.status(err.status || 500).send(ResponseService.failure(err));

        }
    }
    async getFreelancersList(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let Admin = await AdminService.getAdmin({ _id: data.user_id });
            if (!Admin) throw new apiError.ValidationError('admin', message.ID_INVALID);



            let freelancersList = await FreelancerService.getFreelancersList()

            return res.status(200).send(ResponseService.success({ 'freelancersList': freelancersList }));

        } catch (err) {
            return res.status(err.status || 500).send(ResponseService.failure(err));

        } 
    }

    async updatFreelancer(req, res) {
        try {
            let data = Object.assign({}, req.body);

            // let Admin = await AdminService.getAdmin({ _id: data.user_id });
            // if (!Admin) throw new apiError.ValidationError('admin', message.ID_INVALID);

            let criteria = {
                _id: data.freelancer_id
            }

            delete data.user_id

            let updateFreelancer  = await FreelancerService.updateFreelancer(data, criteria)

            return res.status(200).send(ResponseService.success({ 'freelancer': updateFreelancer }));

        } catch (err) {
            return res.status(err.status || 200).send(ResponseService.failure(err));

        }
    }

    async deleteFreelancer(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let Admin = await AdminService.getAdmin({ _id: data.user_id });
            if (!Admin) throw new apiError.ValidationError('admin', message.ID_INVALID);

            let criteria = {
                _id: data.freelancer_id
            }

            delete data.user_id

            let deletedFreelancer = await FreelancerService.deleteFreelancer(criteria)

            return res.status(200).send(ResponseService.success({ 'deletedfreelancer': deletedFreelancer }));

        } catch (err) {
            return res.status(err.status || 500).send(ResponseService.failure(err));

        }
    }
};

module.exports = new FreelancerController();