const mongoose = require('mongoose');
const messages = require('../common/messages');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: " "
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
    institute_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Institute',
        required: false,
    },
    institute_name: {  //remove
        type: String,
        required: false
    },
    education: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    fee: {
        transaction_id: {
            type: mongoose.Types.ObjectId, //transaction id
            ref: 'Transaction',
            required: false
        },
        status: {
            type: Number,
            enum: [1, 2], // 1->Pending , 2-> Paid
            default: 1
        },
        payable_amount: { 
            type: Number, 
            required: false
        }
    },
    degrees: {
        degree_name: {
            type: String,
            required: false
        },
        degree_file: {
            type: String,
            required: false
        }
    },
    certification: {
        certification_name: {
            type: String,
            required: false
        },
        certification_file: {
            type: String,
            required: false
        }
    },
    about_us: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    job_title: {
        type: String,
        required: false
    },
    other: {
        type: String,
        required: false
    },
    status: {
        type: Number,
        enum: [1, 2, 3, 4, 5], // 1-> Active , 2->Inactive, 3-> Deny, 4->Pending, 5->Verified
        default: 4
    },
    gmail_id: {
        type: String,
        required: false,
        default: null
    },
    // facebook_id: {
    //     type: String,
    //     required: false,
    //     default: null
    // },
    is_online: {
        type: Boolean,
        default: true
    },
    facebook_id: {
        type: String,
        required: false
    },
    twitter_link: {
        type: String,
        required: false
    },
    instagram_link: {
        type: String,
        required: false
    },
    linked_in_id: {
        type: String,
        required: false
    },
    commission:{
        type: Number,
        required: false
    },
    stars: { //remove
        type: Number,
        required: false
    },
    totalReviewrs: { //remove
        type: Number,
        required: false
    },
    otp: Number,
    otp_created: Date,
    password_reset_token: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Instructor', schema);
