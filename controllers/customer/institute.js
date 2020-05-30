const InstituteService = require('../../services/institute');

const mongoose = require('mongoose');
const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


// needs to set the response like stars and reviewers
class InstituteController {
    async getInstitute(req, res) {
        try {
            let data = Object.assign({}, req.body);


            if (!data.id) throw new apiError.ValidationError('id', message.ID_REQUIRED);

            let getIntitute = await InstituteService.getOneInstitute({ _id: mongoose.Types.ObjectId(data.id) });
            let newInstitute = {
                id: getIntitute.id,
                name: getIntitute.name,
                picture: getIntitute.picture,
                address: getIntitute.address,
                coordinates: getIntitute.coordinates,
                description: getIntitute.about_us,
                stars: getIntitute.stars,
                totalReviewrs: getIntitute.totalReviewrs
            }
            return res.status(200).send(ResponseService.success({ institute: newInstitute }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

}

module.exports = new InstituteController();