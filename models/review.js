const mongoose = require('mongoose');


var schema = mongoose.Schema({
    customer: { 
        customer_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Customer',
            required: false
        },
        customer_name: {
            type: String,
            required:false
        },
        customer_picture: {
            type: String,
            required:false
        }
    },
    course_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: false
    },
    instructor_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Instructor',
        required: false
    },
    freelancer_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Freelancer',
        required: false
    },
    service_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Freelancer_Services',
        required: false
    },
    star: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        require: false
    },
    review: {
        type: String,
        required: false
    },

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Review', schema);