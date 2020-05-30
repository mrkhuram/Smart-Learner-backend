const express = require('express');
const router = express.Router();

const DegreeController = require('../../../controllers/admin/degree');
const DegreeCategoryController = require('../../../controllers/admin/degreeCategory');


router.post('/new', DegreeController.addNewDegree)
router.post('/add_subject', DegreeController.add_new_subject)
router.post('/delete', DegreeController.deleteDegree)
router.get('/get_one', DegreeController.getOneDegree)
router.get('/get_all', DegreeController.getAllDegree)
router.post('/delete_subject', DegreeController.deleteSubject)
router.post('/add_degree_category', DegreeCategoryController.addNewDegreeCategory)
router.post('/delete_degree_category', DegreeCategoryController.deleteDegreeCategory)
router.get('/get_all_degree_category', DegreeCategoryController.getAllDegreeCategory)

 




module.exports = router;         