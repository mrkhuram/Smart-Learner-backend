const mongoose = require('mongoose');


var schema = mongoose.Schema({
    arabic_name: {
        type: String,
        required: false
    },
    english_name: {
        type: String,
        required: false
    },
    arabic_description: {
        type: String,
        required: false
    },
    english_description: {
        type: String,
        required: false 
    },
    course_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Course',    
        required: false
    },
    provider_id:{
        type: mongoose.Types.ObjectId, // if offered by institute then it will be institutes id
        required: false                // if offered by instructor then it will be instructor's id
    },
    parent: {
        type: mongoose.Types.ObjectId, // if parent === null then it is our topic else it is our chapter 
        ref: 'Chapter',
        required: false,
        default: null
    },
    video: {
        type: String,
        require: false
    },
    file:{
        type: String,
        require: false
    },
    progress: {
        type: Boolean,
        require: false,
        default: false
    }
});

module.exports = mongoose.model('Chapter', schema);