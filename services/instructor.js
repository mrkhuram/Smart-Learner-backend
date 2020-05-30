const Instructor = require('../models/instructor');
const Course = require('../models/course')
const mongoose = require('mongoose');

class InstructorService {
    getInstructor(request) {
        return Instructor.findOne(request)
    }

    createInstructor(details) {
        return new Instructor(details).save(); 
    }

    updateInstructor(criteria, details) {
        return Instructor.findByIdAndUpdate(criteria, details , { new: true });
    }
    deleteInstructor(criteria) {
        return Instructor.findOneAndDelete(criteria);
    }

    async approveOneInstructor(id) {
        return Instructor.findByIdAndUpdate({ _id: id }, { status: 1 }, (err, doc) => console.log(doc))
    }

    async denyOneInstructor(id) {
        return Instructor.findByIdAndUpdate({ _id: id }, { status: 3 }, (err, doc) => console.log(doc))
    }

    // async approveAllInstructor() {
    //     return Instructor.updateMany({ status: 4 }, { status: 1 })
    // }

    // async denyAllInstructor() {
    //     return Instructor.updateMany({ status: 1 }, { status: 3 })
    // }

    async approveMultiInstructor(ids) {
        return Instructor.updateMany(
            {
                _id: { $in: ids }
            },
            { status: 5 }
        ) // 1-> Active , 2->Inactive, 3-> Deny, 4->Pending, 5->Verified
    }
    async denyMultiInstructor(ids) {
        return Instructor.updateMany(
            {
                _id: { $in: ids }
            },
            { status: 3 }
        ) // 1-> Active , 2->Inactive, 3-> Deny, 4->Pending, 5->Verified
    }

    // async updateInstructor(date, criteria) {
    //     return Instructor.findOneAndUpdate(date, criteria, { new: true }).save();
    // }
    async addCoupon(id, details) {
        return Course.findByIdAndUpdate(id, { $set: { 'price': details } }) // discount price will be added in the course price
    }
    async findName(id) {
        return Instructor.findById(id)
    }
    async getAll(status) {
        return Instructor.find(status).lean()
    }
    async getAllVerified(status) {
        return Instructor.find({ status: { $in: status } }).lean()
    }
    async updateStatus(id, status) {
        return Instructor.findByIdAndUpdate({ _id: id }, { $set: { status } })
    }
}

module.exports = new InstructorService();