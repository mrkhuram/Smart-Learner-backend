const mongoose = require('mongoose');



var schema = new mongoose.Schema({
    picture: {
        type: String,
        required: false,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Slider', schema);
