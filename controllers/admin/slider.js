const SliderService = require('../../services/slider');

const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');


class SliderController {

    async addPicture(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.picture) throw new apiError.ValidationError('picture name is required', messages.REQUIRED)

            let details = {
                picture: data.picture
            }

            let addPicture = await SliderService.addPicture(details);
            return res.status(200).send(ResponseService.success({ addPicture: addPicture }));

        } catch (e) {

            return res.status(200).send(ResponseService.failure(err));

        }
    }

    async getAllPictures(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getAllPictures = await SliderService.getAllPictures();
            return res.status(200).send(ResponseService.success({ getAllPictures: getAllPictures }));

        } catch (e) {

            return res.status(200).send(ResponseService.failure(err));

        }
    }

    async deletePicture(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.picture_id) throw new apiError.ValidationError('picture id is required', messages.REQUIRED)

            let criteria = {
                _id: data.picture_id
            }
            let deletePicture = await SliderService.deletePicture(criteria);
            return res.status(200).send(ResponseService.success({ deletePicture: deletePicture }));


        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));
        }
    }
}


module.exports = new SliderController();