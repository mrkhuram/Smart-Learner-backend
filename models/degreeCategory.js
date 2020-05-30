var mongoose = require('mongoose')
var schema = mongoose.Schema

var degreeCategory = new schema({ 

    arabic_category: {
        type: String,
        require: false
    },
    english_category: {
        type: String,
        require: false
    },
    picture: {
        type: String,
        require: false
    } 
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('Degree_Categories', degreeCategory)