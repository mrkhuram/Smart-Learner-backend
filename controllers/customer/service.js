const CommentService = require('../../services/comment');
const Services = require('../../services/services');
const FreelanceServices = require('../../services/FreelanceService');
const ReviewService = require('../../services/review');
const FreelancerService = require('../../services/freelancer');

const mongoose = require('mongoose');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');

class ServiceController {
    async getAllMainServices(req, res) {

        try {

            let condition = {
                parent: null
            }
            let services = await Services.getMainServices(condition);
            return res.status(200).send(ResponseService.success({ services: services }));

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));

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
            return res.status(200).send(ResponseService.failure(e));

        }

    }

    async getFreelancerServices(req, res) {

        try {
            let data = Object.assign({}, req.body);

            let services = []
            let star = 0
            let averageStar = 0

            if (!data.service_category_id) throw new apiError.ValidationError('id', message.ID_REQUIRED);

            let condition = {
                service_category_id: data.service_category_id
            }
            let getervices = await FreelanceServices.getAllServices(condition);
            if (getervices.length > 1) {
                for (let j = 0; j < getervices.length; j++) {
                    services.push(getervices[j].toJSON());
                }
            } else if (getervices.length != 0) {
                services.push(getervices[0].toJSON());
            }

            for (let i = 0; i < getervices.length; i++) {
                let criteria2 = {
                    service_id: getervices[i].id
                }
                let reviews = await ReviewService.getAllReview(criteria2);
                let freelancer = await FreelancerService.getFreelancer({ _id: getervices[i].service_provider });

                if (reviews.length != 0) {
                    let star = 0
                    for (let j = 0; j < reviews.length; j++) {
                        star += reviews[j].star;
                        console.log(star)
                    }
                    let averageStar = star / reviews.length;
                    services[i].stars = averageStar;


                }
                services[i].totalReviwers = reviews.length;

            }

            return res.status(200).send(ResponseService.success({ services: services }));

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));
        }

    }

    async getOneFreelancerService(req, res) {

        try {
            let data = Object.assign({}, req.body);

            let condition = {
                _id: data.id
            }
            let courses = []
            let star = 0
            let averageStar = 0

            let freelancerService = await FreelanceServices.getOneService(condition);
            let service = Object.assign({}, freelancerService.toJSON())

            let reviews = await ReviewService.getAllReview({ service_id: freelancerService.id });

            let freelancer = await FreelancerService.getFreelancer({ _id: freelancerService.service_provider });
            if (!freelancer) throw apiError.ValidationError('Freelancer Not Fond', message.NOT_FOUND);
            if (reviews.length > 0) {
                for (let j = 0; j < reviews.length; j++) {
                    star += reviews[j].star;
                    console.log(star)
                }
                averageStar = star / 5;

                service.stars = averageStar;

            } else {
                averageStar = 0
            }
            service.totalReviwers = reviews.length;
            service.stars = averageStar;

            return res.status(200).send(ResponseService.success({ services: service }));

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));

        }

    }
}

module.exports = new ServiceController();