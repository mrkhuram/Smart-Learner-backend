const mongoose = require('mongoose');


var schema = mongoose.Schema({


    customer_id: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    
    status: {
        type: Number,
        enum: [1, 2], //2=> inprocess, 2=> Completed
        default: 1
    },
    
    transaction_id: {
        type: String
    },
    courses: [
        {
            course_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
            name: {
                type: String,
                required: false, 
            },
            thumbnail: {
                type: String,
                required: false,
            },
            price: {
                type: Number,
                required: false,
            },
            institute_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Institute',
                required: false
            },
            instructor_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Instructor',
                required: false
            },
            instructor_name: {
                type: String,
                required: false
            },
            progress: [],
            topics: {
                type: Number,
                required: false
            }
        }
    ],
    total_amount: {
        type: Number,
        required: false
    },
    order_id: {
        type: Number,
        required: true
    },


}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports = mongoose.model('Course_Order', schema);
