const express = require('express');
const router = express.Router();

const InstituteController = require('../../../controllers/customer/institute');


router.post('/getinstitute', InstituteController.getInstitute)


module.exports = router


