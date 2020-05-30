const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth');
const ServicesRoutes = require('./services');
const DegreeRoutes = require('./degree');
const InstitueRoutes = require('./institutes');
const InstructorRoute = require('./instructor');
const ComplainRoutes = require('./complainAns');
const FreelanceServiceRoutes = require('./freelanceService');
const FreelancerRoutes = require('./frelancer');
const RequiredDocumentsRoutes = require('./requiredDocuments');
const SliderRoutes = require('./slider');

  
router.use('/auth', AuthRoutes);
router.use('/services', ServicesRoutes)
router.use('/degree', DegreeRoutes) 
router.use('/institutes', InstitueRoutes)  
router.use('/instructor', InstructorRoute);
router.use('/complains', ComplainRoutes)
router.use('/freelanceservice', FreelanceServiceRoutes);
router.use('/freelancer', FreelancerRoutes);
router.use('/required_documents', RequiredDocumentsRoutes);
router.use('/slider', SliderRoutes);


module.exports = router;
