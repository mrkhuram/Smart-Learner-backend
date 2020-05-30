const Service_Order = require('../models/service_order')

class ServiceOrderServices { 

    addOrder(details) {
       return new Service_Order(details).save();
    }
    updateOrder(criteria, details){
        return Service_Order.findOneAndUpdate(criteria, details);
    }

    getOrder(criteria){
        return Service_Order.findOne(criteria);
    }
    
    getAllOrders(criteria){
        return Service_Order.find(criteria);
    }

}


module.exports = new ServiceOrderServices()