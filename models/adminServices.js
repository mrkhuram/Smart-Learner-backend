const mongoose = require('mongoose');
const messages = require('../common/messages');

var schema = new mongoose.Schema({
    name_in_english: {
        type: String,
        required: [false, messages.SERVICE_NAME_REQUIRED],
    },
    name_in_arabic: {
        type: String,
        required: [false, messages.SERVICE_NAME_REQUIRED],
    },
    picture: {
        type: String,
        required: false
    },
    arabic_categories: [
        {

            service_name: {
                type: String
            },
            service_image: {
                type: String
            }
        }
    ],
    english_categories: [
        {

            service_name: {
                type: String
            },
            service_image: {
                type: String
            }
        }
    ]
});
module.exports = mongoose.model('Services', schema);
 