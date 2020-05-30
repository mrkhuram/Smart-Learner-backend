const FreelancerService = require('../../services/freelancer');
const ReviewService = require('../../services/review');

const mongoose = require('mongoose');
const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


// needs to set the response like stars and reviewers
class FreelancerCotroller {

    async getFreelancer(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.service_provider) throw new apiError.ValidationError('id', message.ID_REQUIRED);

            let getFreelancer = await FreelancerService.getFreelancer({ _id: mongoose.Types.ObjectId(data.service_provider) });
            if(!getFreelancer) throw new apiError.ValidationError('not found', message.NOT_FOUND);
            //JOBS COMPLETED IS REMAINING DUE TO ORDER BOOKING
            let getReviwes = await ReviewService.getAllReview({freelancer_id: getFreelancer._id})
            // let newInstitute = {
            //     id: getIntitute.id,
            //     name: getIntitute.name,
            //     picture: getIntitute.picture,
            //     address: getIntitute.address,
            //     coordinates: getIntitute.coordinates,
            //     description: getIntitute.about_us,
            //     stars: getIntitute.stars,
            //     totalReviewrs: getIntitute.totalReviewrs
            // }
            getFreelancer.reviews = getReviwes;
            return res.status(200).send(ResponseService.success({ freelancer: getFreelancer }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

}

module.exports = new FreelancerCotroller();