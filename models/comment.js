const mongoose = require('mongoose');

var schema = mongoose.Schema({

    customer: { 
        customer_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Student',
            required: false
        },
        customer_name: {
            type: String,
            required: false
        },
        picture: {
            type: String, 
            required: false
        }
    },
    course_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: false
    },
    topic_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Chapter',
        required: false
    },
    body: {
        type: String,
        required: false
    },
    reply: [
        {
            reply_by: {
                type: String,
                required: false

            },
            user_name: {
                type: String,
                required: false

            },
            user_picture: {
                type: String,
                required: false

            },
            reply_body: {
                type: String,
                required: false
            }
        }
    ]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Comment', schema);