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
    freelancer_skill: {
        type: String,
        required: false
    },
    level: {
        type: String,
        required: false
    }, 
    location: {
        type: String,
        required: false
    }, 
    language: {
        type: String,
        required: false
    },
    response_time: {
        type: Number,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    status: {
        type: Number,
        enum: [1, 2, 3, 4], // 1-> Active , 2->Inactive, 3-> Pending, 4-> Verified  
        default: 3
    },
    is_online: {
        type: Boolean,
        default: true
    },
    gmail_id: {
        type: String,
        required: false,
        default: null
    },
    facebook_id: {
        type: String,
        required: false,
        default: null
    },
    twitter_id: {
        type: String,
        required: false,
        default: null
    },
    instagram_id: {
        type: String,
        required: false,
        default: null
    },
    linkdin_id: {
        type: String,
        required: false,
        default: null
    },
    commission:{
        type: Number,
        required: false
    },
    jobs: {
        type: Number,
        required: false
    },
    otp: Number,
    otp_created: Date,
    password_reset_token: String,
});
module.exports = mongoose.model('Freelancer', schema);
    