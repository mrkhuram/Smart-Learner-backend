const mongoose = require('mongoose');

var schema = mongoose.Schema({

    transaction_id: { //balance_transaction
        type: String,
        required: true
    },
    charges_id: {
        type: String,
        required: true
    },
    transaction_owner: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    created_stamp: {
        type: Number,
        required: false
    },
    stripe_customer_id: {
        type: String,
        required: false
    },
    payment_method_id: {
        type: String,
        required: false
    },
    fingerprint: {
        type: String,
        required: false
    },
    brand:{
        type: String,
        required: false
    },
    last4: {
        type: Number,
        required: false
    },
    network: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports =  mongoose.model('Transaction', schema);