const express = require('express');
const router = express.Router();

const AuthController = require('../../../controllers/common/auth'); 

const Upload = require('../../../common/multer')

router.post('/register', Upload.any(), AuthController.register.bind(AuthController))
router.post('/login',  AuthController.login.bind(AuthController))
 
module.exports = router;       