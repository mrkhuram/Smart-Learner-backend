const mongoose = require('mongoose');
const messages = require('../common/messages');

var schema = new mongoose.Schema({
    coupon_code: {
        type: String,
        required: true,
    },
    coupon_type: {
        type: Number,
        enum: [1, 2], // 1-> Fixed,  2-> Precentage
        required: true
    },
    instructor: {
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Instructor',
            required: true
        },
        name: {
            type: String,
            required: true
        },
    },

    value: {
        type: Number,
        required: true,
        min: [1, messages.COUPON_VALUE_GREATER_THAN_0]
    },

    start_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    usage: {
        type: Number,
        required: true,
        default: 10
    },
    end_date: {
        type: Date,
        required: true
    },
    course_id: {
        type: String,
        required: false
    },
    added_by: { 
        title: {
            type: String,
            required: false
        },
        userId: {
            type : mongoose.SchemaTypes.ObjectId,
            required: false
        }
    }
});



module.exports = mongoose.model('Coupon', schema);
    