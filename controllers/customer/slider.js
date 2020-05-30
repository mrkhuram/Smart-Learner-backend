const SliderService = require('../../services/slider');

const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');


class SliderController {

   
    async getAllPictures(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getAllPictures = await SliderService.getAllPictures();
            return res.status(200).send(ResponseService.success({ getAllPictures: getAllPictures }));

        } catch (e) {

            return res.status(200).send(ResponseService.failure(err));

        }
    }

    
}


module.exports = new SliderController();