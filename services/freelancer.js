const Freelancer = require('../models/freelancer');
const mongoose = require('mongoose');
const Service = require('../models/freelancerServices')

class FreelancerService {
    getFreelancer(criteria) {  
        return Freelancer.findOne(criteria)
    }
    getFreelancersList(){
        return Freelancer.find();
    }
    getFreelancers(criteria){
        return Freelancer.find(criteria)
    }
 
    createFreelancer(details) {
        return new Freelancer(details).save(); 
    }
    updateFreelancer(data, criteria) {
        return Freelancer.findOneAndUpdate(criteria , data, {new: true});
    }
    deleteFreelancer(criteria){
        return Freelancer.deleteOne(criteria)
    }
    createFreelancerService(details){
        return new Service(details).save()
    }
} 

module.exports = new FreelancerService();