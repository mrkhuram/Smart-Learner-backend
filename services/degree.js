const Degree = require('../models/degree')
const DegreeSubjects = require('../models/addSubjects')

const mongoose = require('mongoose');

class DegreeService {
    degreeExist(request) {
        return Degree.findOne(request)
    }
    createDegree(details) { 
        return new Degree(details).save()
    } 
    createDegreeSubjects(details) {
        return new DegreeSubjects(details).save()
    }
    async pushNewSubject(id,details){
        return Degree.findOneAndUpdate({_id: id}, {$push: details})
    }
    subjectExist(details){
        return DegreeSubjects.findOne(details)
    }
    checkingDegreeId(details){
        return Degree.findOne(details)
    } 
    deleteDegree(id) {
        return Degree.deleteMany({ _id: { $in: id } })

    }
    getAllDegrees(){
        return Degree.find()
    }
    getAllSubjects(){
        return DegreeSubjects.find()
    }
    deleteSubject(id, obj) {
        return Degree.updateMany({ _id: id }, { $pull: obj })
    }
}
module.exports = new DegreeService(); 
