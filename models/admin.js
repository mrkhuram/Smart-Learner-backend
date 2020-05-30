const mongoose = require('mongoose');
const messages = require('../common/messages');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: [true, messages.EMAIL_REQUIRED],
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: Number,
        enum: [1, 2], // 1-> Active , 2->Inactive
        default: 1
    },
    is_online: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('Admin', schema);
    