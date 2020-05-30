const express = require('express');
const router = express.Router();

const MessagingController = require('../../../controllers/customer/messaging');



// router.post('/join-chat', MessagingController.joinChat) 
router.post('/auth', MessagingController.auth) 

router.post('/send-message', MessagingController.sendmessage)
router.post('/reply', MessagingController.reply)
router.post('/getthread', MessagingController.getThread)
router.post('/getcustomerthread', MessagingController.getCustomerThread);
router.post('/getallthreads', MessagingController.getAllThreads)

module.exports = router


