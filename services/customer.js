const Customer = require('../models/customer');

 
class CustomerService {

    createCustomer(details){
        return new Customer(details).save();
    }

    updateCutomer(details, criteria){
        return Customer.findOneAndUpdate(criteria, details, {new: true});
    }

    getCustomer(criteria){
        return Customer.findOne(criteria);
    }

    getManyCutomers(criteria){
        return Customer.find(criteria);
    }

    getAllCustomers(){
        return Customer.find();
    }
    deleteCutomer(criteria){
        return Customer.findOneAndDelete(criteria);
    }
};

module.exports = new CustomerService();