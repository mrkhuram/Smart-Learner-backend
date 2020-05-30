const express = require('express');
const router = express.Router();

const RequireDocumentsRoutes = require('../../../controllers/institute/requireDocuments');

router.get('/getcertificate', RequireDocumentsRoutes.getOneCertificate);
router.get('/getallCertificates', RequireDocumentsRoutes.getAllCertificates);
router.post('/add', RequireDocumentsRoutes.addDocument);
router.post('/updatecertificate', RequireDocumentsRoutes.updateCertificate);
router.get('/delete', RequireDocumentsRoutes.deleteCertificate);
 
 



module.exports = router;