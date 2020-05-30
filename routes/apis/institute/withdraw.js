const express = require('express');
const router = express.Router();


const WithdrawController = require('../../../controllers/institute/withdraw');
const StripeController = require('../../../controllers/common/stripeAccounts');



router.post('/withdrawrequest', WithdrawController.withdrawRequest);
router.post('/getsales', WithdrawController.getSales);
router.post('/withdrawhistory', WithdrawController.getWithdrawHistory);

router.get("/get-oauth-link", StripeController.getAuthLink);
router.get("/authorize-oauth", StripeController.authorize ) 


module.exports = router;
