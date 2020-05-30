const express = require('express');
const router = express.Router();

const EventController = require('../../../controllers/institute/event');

const Upload = require('../../../common/multer'); 

router.post('/addevent', Upload.any(), EventController.addEvent);
router.post('/updateevent', Upload.any(), EventController.updateEvent);
router.post('/getevent', EventController.getEvent);
router.post('/getmanyevents', EventController.getManyEvents); 
router.post('/changeeventstatus',  EventController.changeEventStatus);
router.post('/getevenbookings',  EventController.getEventBookings);


module.exports = router;
