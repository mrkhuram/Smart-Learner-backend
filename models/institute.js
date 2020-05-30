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
    status: {
        type: Number,
        enum: [1, 2, 3, 4 , 5], // 1->Pending , 2-> Verified, 3->Active , 4-> Inactive, 5-> Denied
        default: 1
    },
    fee: {
        transaction_id: {
            type: mongoose.Types.ObjectId,
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
    type: {
        type: String,  //intitute type
        required: false
    },
    about_us: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    coordinates: {

        latitude: {
            type: Number,
            required: false
        },

        longitude: {
            type: Number,
            required: false
        }
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
    certificate:{
            certificate_name: {
                type: String,
                required: false
            },
            certificate_file: {
                type: String,
                required: false
            }
        }
    ,
    licance:{
        licance_name: {
            type: String,
            required: false
        },
        licance_file: {
            type: String,
            required: false
        }
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
module.exports = mongoose.model('Institute', schema);
