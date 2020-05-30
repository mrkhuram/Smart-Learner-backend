const mongoose = require('mongoose');




var schema = new mongoose.Schema({
    payable_amount:{
        type: Number,
        required: false,
    },
    paid_amount:{
        type: Number,
        required: false
    },
    paid_by:{
        type: mongoose.Types.ObjectId,
        required: false
    },
    transaction_id:{
        type: String,
        required: false
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


module.exports = mongoose.model('Fee', schema);