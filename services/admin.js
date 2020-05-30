const Admin = require('../models/admin');

const mongoose = require('mongoose');

class AdminService {
    getAdmin(request) {
        return Admin.findOne(request)
    }
    createAdmin(details) {
        return new Admin(details).save();
    }

    
}
module.exports = new AdminService(); 
