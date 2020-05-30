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
    },
    gmail_id: {
        type: String,
        required: false,
        default: null
    },
    facebook_id: {
        type: String,
        required: false
    },
    mobile_no:{
        type: String,
        require:false
    },
    
    otp: Number,
    otp_created: Date,
    password_reset_token: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Customer', schema);
