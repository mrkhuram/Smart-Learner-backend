const mongoose = require('mongoose');



var schema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Types.ObjectId,
        ref:'Customer',
        required: false
    },
    freelancer_id: {
        type: mongoose.Types.ObjectId,
        ref:'Freelancer',
        required: false
    },
    chat: [
       {
            sender: mongoose.Types.ObjectId,
            body: {
                type: String,
                required: false
            }
        }
    ]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Messaging', schema)
