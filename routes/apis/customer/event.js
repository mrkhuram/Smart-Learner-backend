const express = require('express');
const router = express.Router();

const EventBookingController = require('../../../controllers/customer/event_booking');

router.post('/getevent', EventBookingController.getEvent);
router.post('/getallevents', EventBookingController.getAllEvents); 
router.post('/bookevent', EventBookingController.bookEvent);
router.post('/getbookedevent', EventBookingController.getBookedEvent);
router.post('/getallbookedevents', EventBookingController.getAllBookedEvents); 
router.post('/cancelevent', EventBookingController.cancelEvent);  






module.exports = router;