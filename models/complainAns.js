const mongoose = require('mongoose');

var schema = mongoose.Schema({

    complain_by: {
        id: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        type: {
            type: String, // like professor or student
            required: false
        },
        name: {
            type: String,
            required: false
        },
        picture: {
            type: String,
            required: false
        }
    },
    complain_body: {
        type: String,
        required: false
    },
    answer: {
        type: String,
        required: false
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Complain_ans', schema);