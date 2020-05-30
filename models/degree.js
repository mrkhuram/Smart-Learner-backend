const mongoose = require('mongoose');
const messages = require('../common/messages');

var schema = new mongoose.Schema({
    degree_name_in_english: {
        type: String,
        required: false
    },
    degree_name_in_arabic: {
        type: String,
        required: false
    },
    arabic_subjects: [
        {

            subject_name: {
                type: String
            },
            subject_image: {
                type: String
            }
        }
    ],
    english_subjects: [
        {

            subject_name: {
                type: String
            },
            subject_image: {
                type: String
            }
        }
    ]
});
module.exports = mongoose.model('degrees', schema);
     