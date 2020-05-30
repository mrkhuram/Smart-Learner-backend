const Services = require('../models/adminServices');


const mongoose = require('mongoose');

class Service {
    isExist(request) {
        return Services.findOne(request)
    }
    createService(details) {
        return new Services(details).save()

    }
    createServiceCategory(id, details) {
        return Services.findByIdAndUpdate({_id: id}, {$push : details})
    }
    isIdExist(id) {
        return Services.findOne({ _id: id })
    }
    deleteService(id) {

        return Services.deleteMany({ _id: { $in: id } })


    }
    async deleteCategory(id, obj) {
        return Services.updateMany({ _id: id }, { $pull: obj })
    }
    getAllServices() {
        return Services.find() 
    }

    getMainServices(condition) {
        return Services.find(condition);
    }

    getServiceCategories(condition) {
        return Services.find(condition);
    }

    findCategory(id) {
        return Services.find(id)
    }

}
module.exports = new Service(); 
