const mongoose = require('mongoose');



var schema = new mongoose.Schema({

    withdraw_owner:{
        type: mongoose.Types.ObjectId,
        required: false
    },
    amount: {
        type: Number,
        required:false
    },
    status: {
        type: Number,
        enum:[1, 2],  //1=> Pending, 2=> Approved 
        default: 1
    },
    bank_name:{
        type: String,
        required: false
    },
    acc_tittle:{
        type:String,
        required:false
    },
    acc_type:{
        type:String,
        required:false
    },
    acc_number:{
        type: Number,
        required:false
    },
    

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Withdraw', schema);