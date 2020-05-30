let mongoose = require('mongoose');

// const MONGODB_URI = 'mongodb://127.0.0.1:27017/smart-learners'
const MONGODB_URI = 'mongodb+srv://smart:1234@smart-learners-k5hsj.mongodb.net/smart-learners?retryWrites=true&w=majority'
// const MONGODB_URI = 'mongodb+srv://mohsin:12345@cluster0-m7tgs.mongodb.net/collegeDb?retryWrites=true&w=majority'


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function (err, connection) {
    console.log(err || connection);
});






