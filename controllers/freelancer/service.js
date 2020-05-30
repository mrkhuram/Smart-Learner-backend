const FreelanceServices = require('../../services/FreelanceService');
const Services = require('../../services/services');

const mongoose = require('mongoose');

const apiError = require('../../common/api-errors')
const message = require('../../common/messages')
const ResponseService = require('../../common/response');

class FreelancerServicesController {

    async createService(req, res) {
        try {
            let data = Object.assign({}, req.body)
            if (data.silver) {
                data.packages = [
                    {
                        basic: data.basic
                    },
                    {
                        silver: data.silver
                    },
                    {
                        golden: data.golden
                    }
                ]
            }
            if (req.files.length > 1) {
                let images = []
                req.files.forEach(item => {
                    images.push(item.filename)
                });
                data.images = images
            }

            if (!data.service_title) throw new apiError.freelancerServices('service_title', message.SERVICE_TITLE_REQUIRED)
            if (data.basic) {
                delete data.basic
                delete data.silver
                delete data.golden
                delete data[0]
                delete data[1]
                delete data[2]
            }
            let serviceCreated = await FreelanceServices.createService(data)


            res.status(200).send(ResponseService.success({ service: serviceCreated }))


        } catch (e) {
            return res.status(200).send(ResponseService.failure(e))
        }

    }

    async updateService(req, res) {
        try {
            let data = Object.assign({}, req.body) 

            if (!data.service_id) throw new apiError.freelancerServices('service_title', message.SERVICE_TITLE_REQUIRED)

            let criteria = {
                _id: data._id
            }
            if (data.silver) {
                data.packages = [
                    {
                        basic: data.basic
                    },
                    {
                        silver: data.silver
                    },
                    {
                        golden: data.golden
                    }
                ]
            }
            if (req.files.length > 0) {
                let images = []
                req.files.forEach(item => {
                    images.push(item.filename)
                });
                data.images = images
            }
            if (data.basic) {
                delete data.basic
                delete data.silver
                delete data.golden
                delete data[0]
                delete data[1]
                delete data[2]
            }
            let serviceUpdated = await FreelanceServices.updateService(criteria, data)


            res.status(200).send(ResponseService.success({ service: serviceUpdated }))


        } catch (error) {
            return res.status(200).send(ResponseService.failure(error))
        }

    }

    async getService(req, res) {
        try {
            let data = Object.assign({}, req.body)


            if (!data.service_id) throw new apiError.ValidationError('id', message.ID_INVALID)

            let service_id = mongoose.Types.ObjectId(data.service_id);

            let getService = await FreelanceServices.getOneService({ service_id: service_id });


            res.status(200).send(ResponseService.success({ service: getService }))


        } catch (error) {
            return res.status(200).send(ResponseService.failure(error))
        }

    }

    async getAllServices(req, res) {
        try {
            let data = Object.assign({}, req.body)


            if (!data.freelancer_id) throw new apiError.ValidationError('id', message.ID_INVALID)

            let freelancer_id = mongoose.Types.ObjectId(data.freelancer_id);

            let getAllServices = await FreelanceServices.getAllServices({ service_provider: freelancer_id });


            res.status(200).send(ResponseService.success({ service: getAllServices }))


        } catch (error) {
            return res.status(200).send(ResponseService.failure(error))
        }

    }

    
    //Get Service categories for creating gig
    async getAllMainServices(req, res) {

        try {

            let condition = {
                parent: null
            }
            let services = await Services.getAllServices();
            return res.status(200).send(ResponseService.success({ services: services }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));

        }

    }

    async getServiceCategories(req, res) {

        try {
            let data = Object.assign({}, req.body);

            if (!data.service_id) throw new apiError.ValidationError('id', message.ID_REQUIRED);
            let condition = {
                _id: mongoose.Types.ObjectId(data.service_id)
            }
            let serviceCategories = await Services.getServiceCategories(condition);
            return res.status(200).send(ResponseService.success({ service: serviceCategories }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));

        }

    }

}

module.exports = new FreelancerServicesController()