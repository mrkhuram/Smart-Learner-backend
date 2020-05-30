const Institute = require('../models/institute');
const mongoose = require('mongoose');

class InstituteService {
    getInstitute(request) {
        return Institute.findOne(request)
    }

    createInstitute(details) {
        return new Institute(details).save();
    }
    async updateInstitute( criteria, data) {
        return Institute.findByIdAndUpdate( criteria, data);
    }
    async approveOneInstitute(id) {
        return Institute.findByIdAndUpdate(
            { _id: id },
            { status: 2 },
            (err, doc) => console.log(doc)
        )
    }

    async denyOneInstitute(id) {
        return Institute.findByIdAndUpdate(
            { _id: id },
            { status: 5 },
            (err, doc) => console.log(doc)
        )
    }

    async approveAllInstitute() {
        return Institute.updateMany(
            {
                status: { $in: [1, 4] }
            },
            { status: 2 }
        )  // 1->Pending , 2-> Verified, 3->Active , 4-> Inactive, 5-> Denied
    }

    async denyAllInstitute() {
        return Institute.updateMany(
            {
                status: 1
            },
            { status: 5 }
        ) // 1->Pending , 2-> Verified, 3->Active , 4-> Inactive, 5-> Denied
    }
    async approveMultiInstitute(ids) {
        return Institute.updateMany(
            {
                _id: { $in: ids }
            },
            { status: 2 }
        ) // 1->Pending , 2-> Verified, 3->Active , 4-> Inactive, 5-> Denied
    }
    async denyMultiInstitute(ids) {
        return Institute.updateMany(
            {
                _id: { $in: ids }
            },
            { status: 5 }
        ) // 1->Pending , 2-> Verified, 3->Active , 4-> Inactive, 5-> Denied
    }
    async deleteInstitute(id) {
        return Institute.findByIdAndDelete(
            { _id: id },
            (err, doc) => console.log(doc)
        )
    }
    async getOneInstitute(id) {
        return Institute.findOne(id)
    }
    async getAll(status) {
        return Institute.find(status).lean()
    }
    async getAllVerified(status) {
        return Institute.find({ status: { $in: status } }).lean()
    }
    async updateStatus(id, status) {
        return Institute.findByIdAndUpdate({ _id: id }, { $set: { status } })
    }
}

module.exports = new InstituteService(); 