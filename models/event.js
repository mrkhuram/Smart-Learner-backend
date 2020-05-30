const mongoose = require('mongoose');


var schema = new mongoose.Schema({

    english_tittle: {
        type: String,
        required: false,
    },
    arabic_tittle: {
        type: String,
        required: false,
    },
    institute_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Institute',
        required: false
    },
    picture: {
        type: String,
        required: false,
    },
    english_description: {
        type: String,
        required: false,
    },
    arabic_description: {
        type: String,
        required: false,
    },
    english_venue: {
        type: String,
        required: false,
    },
    arabic_venue: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    time: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: false,
    },

    total_seats: {
        type: Number,
        required: false,
    },
    remaining_seats: {
        type: Number,
        required: false
    },

    status: {
        type: Number,
        enum: [1, 2, 3], // 1=> Active, 2=> canceled, 3=>Inactive
        default: 1
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
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Event', schema);