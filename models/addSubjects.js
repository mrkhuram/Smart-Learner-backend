const mongoose = require('mongoose');
const messages = require('../common/messages');

var schema = new mongoose.Schema({
    parent_category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Degree'
    },

    subject_in_english: {
        type: String,
        required: false
    },
    subject_in_arabic: {
        type: String,
        required: false
        
    },
});
module.exports = mongoose.model('Subjects', schema);
    