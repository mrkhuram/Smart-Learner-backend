const Slider = require('../models/slider');



class SliderService {

    addPicture(details) {
        return new Slider(details).save();
    }
    getAllPictures(){
        return Slider.find()
    }

    deletePicture(criteria){
        return Slider.findOneAndDelete(criteria);
    }

}

module.exports = new SliderService();