const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    event_id: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    order_id:{
        type: Number,
        require:false
    },
    english_event_tittle: {
        type: String,
        require: false
    },
    arabic_event_tittle: {
        type: String,
        require: false
    },
    english_event_description: {
        type: String,
        require: false
    },
    arabic_event_description: {
        type: String,
        require: false
    },
    event_picture: {
        type: String,
        require: false
    },
    customer_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    seats: {
        type: Number,
        required: false
    },
    date: {
        type: String,
        required: false,
    },
    status: { 
        type: Number,
        enum: [1, 2, 3, 4], // 1=> Booked, 2=> Event Cancelled  , 3=> Order Cancelled , 4=> Not booked
        default: 4
    },
    price: {
        type: String,
        require: false
    }
    
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model('Event_booking', schema);