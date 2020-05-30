const express = require('express');
const router = express.Router();

const DegreeController = require('../../../controllers/admin/degree');
const DegreeCategoryController = require('../../../controllers/admin/degreeCategory');


router.get('/get_all', DegreeController.getAllDegree)
router.get('/get_all_degree_category', DegreeCategoryController.getAllDegreeCategory) 


module.exports = router;         