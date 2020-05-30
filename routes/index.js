const express = require('express');
const router = express.Router();

const apiRoutes = require('./apis');
// const StripeController = require('../controllers/freelancer/stripe');


router.get('/join-chat', function (req, res, next) {
    res.render('index.ejs');
});
   
router.get('/index', function(req, res, next){
    res.render('index');
});
router.get('/signup', function(req, res, next){
    res.render('signup');
});        
router.use('/profile', function(req, res, next){
    console.log(req);  
    
    res.send(req.user);
});                                                                              
router.use('/api', apiRoutes)       

// router.get('/index', function (req, res, next) {
//     res.render('index');
// });
// router.get("/get-oauth-link", StripeController.getAuthLink);
// router.get("/authorize-oauth", StripeController.authorize ) 

// router.get('/signup', function (req, res, next) {
//     res.render('signup');
// });
// router.use('/profile', function (req, res, next) {
//     console.log(req);

//     res.send(req.user);
// });


// router.post('/join-chat', (req, res) => {
//     // store username in session
//     console.log('helo')
//     req.session.username = req.body.username;
//     res.json('Joined');
// });   
// router.post('/pusher/auth', (req, res) => {
//     const socketId = req.body.socket_id;
//     const channel = req.body.channel_name;
//     // Retrieve username from session and use as presence channel user_id
//     const presenceData = {
//         user_id: req.session.username
//     };
//     const auth = pusher.authenticate(socketId, channel, presenceData);
//     res.send(auth);
// });

// router.post('/send-message', (req, res) => {
//     pusher.trigger('presence-groupChat', 'message_sent', {
//         username: req.body.username,
//         message: req.body.message
//     });
//     res.send('Message sent');
// });

// router.use('/api', apiRoutes)


module.exports = router;