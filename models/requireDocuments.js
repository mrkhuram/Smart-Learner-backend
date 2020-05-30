const  mongoose = require('mongoose');


var schema = mongoose.Schema({
    certificate_name :{
        type: String,
        required: false
    },
    licenses_name :{
        type: String,
        required: false
    },
    institute_type:{
        type: String,
        required: false
    }
},{ 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Required_Documents', schema);