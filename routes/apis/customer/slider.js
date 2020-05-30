const express = require('express');
const router = express.Router();

const SliderController = require('../../../controllers/customer/slider');

router.post('/getallpictures', SliderController.getAllPictures);


module.exports = router;