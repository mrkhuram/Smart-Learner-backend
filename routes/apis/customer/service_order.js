const express = require('express');
const router = express.Router();

const Upload = require('../../../common/multer');

const ServiceOrderController = require('../../../controllers/customer/service_order');
 
router.post('/placeorder', Upload.any(), ServiceOrderController.addService);
router.post('/cancelorder', ServiceOrderController.cancelOrder);
router.post('/acceptorder', ServiceOrderController.markCompleted);
router.post('/getorder', ServiceOrderController.getOneOrder);
router.post('/inprocessorders', ServiceOrderController.getInProcessOrders);
router.post('/completedorders', ServiceOrderController.getCompletedOrders);
router.post('/cancelledorders', ServiceOrderController.getCancelledOrders);
router.post('/dispute', ServiceOrderController.disputeOrder);



module.exports = router;