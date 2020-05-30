const express = require('express');
const  router = express.Router();

const ServicesController = require('../../../controllers/admin/services'); 

const Upload = require('../../../common/multer');
 
router.post('/add_service', Upload.any(), ServicesController.addNewService.bind(ServicesController))
router.post('/add_new_category',Upload.any(),  ServicesController.add_new_category);
router.post('/delete_service',  ServicesController.deleteService.bind(ServicesController))
router.get('/get_service',  ServicesController.getAll.bind(ServicesController))
router.get('/get_one_service',  ServicesController.getOne.bind(ServicesController))
router.post('/delete_service_category' , ServicesController.deleteCategory.bind(ServicesController))
   
 
module.exports = router;         