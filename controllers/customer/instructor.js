const InstructorService = require('../../services/instructor');

const mongoose = require('mongoose');
const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


// needs to set the response like stars and reviewers

class InstructorController {
    async getInstructor(req, res) {
        try {
            let data = Object.assign({}, req.body);


            if (!data.id) throw new apiError.ValidationError('id', message.ID_REQUIRED);

            let getInstructor = await InstructorService.getInstructor({ _id: mongoose.Types.ObjectId(data.id) });
            let newInstructor = {
                id:getInstructor.id,
                name: getInstructor.name,
                picture: getInstructor.picture,
                address: getInstructor.address,
                education: getInstructor.education,
                institute_name: getInstructor.institute_name,
                institute_id: getInstructor.institute_id,
                description: getInstructor.about_us,
                stars: getInstructor.stars,
                totalReviewrs: getInstructor.totalReviewrs
            }
            return res.status(200).send(ResponseService.success({ instructor: newInstructor }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

}

module.exports = new InstructorController();