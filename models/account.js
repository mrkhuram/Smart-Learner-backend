const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        // ref: 'Degree'
        required: false
    },

    account_no: {
        type: String,
        required: false
    },
    status:{
        type: Number,
        enum:[1, 2],   //1=> Active, 2=>inactive
        default:1
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
module.exports = mongoose.model('Account', schema);
    