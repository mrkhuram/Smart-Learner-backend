const mongoose = require('mongoose');
const messages = require('../common/messages');


var scheme = new mongoose.Schema({
    degree: {
        type: mongoose.Types.ObjectId,
        ref: 'Degree',
        required: false
    },
    subject: {
        type: mongoose.Types.ObjectId,
        ref: 'Subject',
        required: false
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Degree_Categories',
        required: false
    },
    english_description: {
        type: String,
        required: false
    },
    arabic_description: {
        type: String,
        required: false
    },
    english_tittle: {
        type: String,
        required: false
    },
    arabic_tittle: {
        type: String,
        required: false
    },
    english_sub_tittle: {
        type: String,
        required: false
    },
    arabic_sub_tittle: {
        type: String,
        required: false
    },
    pre_requests: {
        type: String,
        required: false
    },
    languages: {
        type: String,
        required: false
    },
    learning_outcomes: {
        type: String,
        required: false
    },
    promo_video: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
    price: {
        price_type: {
            type: Number,
            enum: [1, 2], // 1=> Paid, 2=>Free
            required: false
        },
        origional_amount: {
            type: Number,
            required: false
        },
        discount_price: {
            type: Number, // price will be in numbers not in percentage here. like 25$ of 100$ 
            required: false
        },
        starting_date: {
            type: Date,
            required: false
        }, 
        ending_date: {
            type: Date,
            required: false
        }
    },
    is_featured: {
        type: Boolean,
        default: false
    },
    is_best_selling: {
        type: Boolean,
        default: false
    },
    discount_coupon_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Discount',
        required: false
    },
    institute_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Institute',
        required: false
    },
    instructor_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Instructor',
        required: false
    },
    status: {
        type: Number,
        enum: [1, 2], // 1=> Active, 2=>Inactive
    },
  

    keywords: [{
        type: String
    }]

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Course', scheme);