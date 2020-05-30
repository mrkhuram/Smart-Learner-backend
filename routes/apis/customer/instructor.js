const express = require('express');
const router = express.Router();

const InstructorController = require('../../../controllers/customer/instructor');


router.post('/getinstructor', InstructorController.getInstructor)


module.exports = router


