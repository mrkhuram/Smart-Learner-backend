const mongoose = require('mongoose');
const messages = require('../common/messages');

var schema = new mongoose.Schema({

    service_provider: {
        type: mongoose.Types.ObjectId,
        ref: 'Freelancer',
        required: false
    },
    service_title: {
        type: String,
        required: [true, messages.SERVICE_NAME_REQUIRED],
    },
    service_id: {
        type: String,
        required: false
    }, 
    service_category_id: {
        type: String,
        required: false
    },
    packages: [
        {
            basic: {
                basic_description: {
                    type: String,
                    required: false
                },
                delivery_days: {
                    type: Number,
                    required: false
                },
                revision: {
                    type: Number,
                    required: false
                },
                source_file: {
                    type: Boolean,
                    required: false,
                   
                },
                words_include: {
                    type: String,
                    required: false
                },
                price: {
                    type: Number,
                    required: false
                }

            },
            silver: {
                basic_description: {
                    type: String,
                    required: false
                },
                delivery_days: {
                    type: Number,
                    required: false
                },
                revision: {
                    type: Number,
                    required: false
                },
                source_file: {
                    type: Boolean,
                    required: false,
                   
                },
                words_include: {
                    type: String,
                    required: false
                },
                price: {
                    type: Number,
                    required: false
                }

            },
            golden: {
                basic_description: {
                    type: String,
                    required: false
                },
                delivery_days: {
                    type: Number,
                    required: false
                },
                revision: {
                    type: Number,
                    required: false
                },
                source_file: {
                    type: Boolean,
                    required: false,
                   
                },
                words_include: {
                    type: String,
                    required: false
                },
                price: {
                    type: Number,
                    required: false
                }

            }
        }
    ],
    requirements: {
        type: String,
        required: false
    },
    images: [

        {
            type: String,
            required: false
        }
        
    ],
    status: {
        type: Number,
        enum: [1, 2], // 1 => Actice, 2=> InActive,
        default: 1
    },
    stars: {
        type: Number,
        required: false,
    },
    totalReviwers: {
        type: Number,
        required: false,
    },
    freelancer_name: {
        type: String,
        required: false
    },
    freelancer_picture: {
        type: String,
        required: false
    },
    freelancer_skill: {
        type: String,
        required: false
    },
 
});
module.exports = mongoose.model('Freelancer_Services', schema);
