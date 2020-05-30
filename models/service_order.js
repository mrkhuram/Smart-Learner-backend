const mongoose = require('mongoose');


var schema= new mongoose.Schema({
    service_tittle: {
        type: String,
        required: false
    },
    freelancer_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Freelancer',
        required: false
    },
    service_id: {
        type: mongoose.Types.ObjectId,
        ref:'Freelancer_Services',
        required: false
    },
    customer_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required:false
    },
    package: {
        type: Number,
        enum:[1, 2, 3] //1=> Gold, 2=> Silver, 3=> Basic
    },
    price:{
        type: Number,
        required: false
    },
    order_id: {
        type: Number,
        required: false
    },
    duration: {
        type: Number,
        require: false
    },
    source_files: [{
        type: String,
        required: false
    }],
    start_date: {
        type: String,
        required: false
    },
    cancelled_by: {
        type: Number,
        enum: [1, 2], // 1=> Freelancer, 2=>Buyer
        required: false
    },
    reason:{
        type:String,
        required: false
    },
    deliver_date: {
        type: String,
        required: false
    },
    cancelled_date: {
        type: String,
        required: false
    },
    status:{
        type: Number,
        enum: [1, 2, 3, 4, 5], // 1=> Placed, 2=> inProcess, 3=> completed, 4=> cancelled, 5=> disputed
        required: false,
        default: 1
    },
    dispute: {
        dispute_reason: {
            type: String,
            required: false
        },
        disputed_by: {
            type:Number,
            enum:[1, 2], // 1=>Customer, 2=> Freelancer
            required: false
        }
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('service_order', schema)