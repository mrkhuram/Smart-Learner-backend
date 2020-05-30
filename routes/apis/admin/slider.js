const express = require('express');
const  router = express.Router();

const SliderController = require('../../../controllers/admin/slider'); 

const Upload = require('../../../common/multer');


router.post('/addpicture', Upload.any(), SliderController.addPicture);
router.post('/getallpictures', SliderController.getAllPictures);
router.post('/deletepicture', SliderController.deletePicture);


module.exports = router;
