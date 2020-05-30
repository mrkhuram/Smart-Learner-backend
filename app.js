const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const path = require('path');
// const constants = require('./config/constants');
const cors = require('cors')

// const PaymentController = require('./stripe')
require('dotenv').config();


module.exports = function () {
    let server = express(), create, start;

    create = function (config) {

        // Server settings
        server.set('port', config.port);
        server.set('hostname', config.hostname);


        server.set('views', path.join(__dirname, 'views'));
        server.set('view engine', 'ejs');

        // server.engine('html', require('ejs').renderFile);
        // Returns middleware that parses json
        server.use(bodyParser.json());
        // using cross orign 
        server.use(cors())

        //Session Maintaining
        require('./middlewares/passport');
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(cookieParser())
        server.use(expressSession({
            secret: 'This is my sercert',
            saveUninitialized: false,
            resave: false
        }));

        server.use(passport.initialize());
        server.use(passport.session());



        // Accessing static content
        // server.set('views', path.join(__dirname, 'views'));

        server.set('uploads', path.join(__dirname, 'uploads'));
        server.use('/uploads', express.static('static/uploads'));
        server.use(function (req, res, next) {
            // Website you wish to allow to connect
            // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'POST');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
       

        let routes = require('./routes')

        // Set up routes
        server.use('/', routes); 

        // Setting up templating engine
        // server.set('view engine', 'ejs');

        server.use((req, res) => {
            res.status(404).send('not found');

        });
    }

    start = function () {
        let hostname = server.get('hostname');
        let port = server.get('port');


        require('./config/db/config');

        mongoose.set('useFindAndModify', false);
        mongoose.set('debug', true);
        mongoose.Promise = global.Promise;

        //Get the default connection
        var db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        db.once('open', async function () {
            console.log('Db is Successfully Connected')
            server.listen(port, function () {
                console.log('Db connected successfully && Server started at - http://' + hostname + ':' + port);
            })
        });


    };
    unhandledRoutes = function () {
        // Handling errors if route doesn't match 
        server.use((req, res, next) => {
            const error = new Error('Undefined route.');
            error.status = 404;
            next(error);
        });

        // Returning error with response
        server.use((error, req, res, next) => {
            res.status(error.status || 500);
        });
    };
    return { create, start };
};