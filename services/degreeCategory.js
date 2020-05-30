const CategoryDegree = require("../models/degreeCategory")

const mongoose = require('mongoose');

class DegreeCategory {
    degreeExist(request) {
        return CategoryDegree.findOne(request)
    }
    insertDegreeCategory(details) {
        return new CategoryDegree(details).save()
    }
    getAllCategories(){
        return CategoryDegree.find();
    }
    createDegreeSubjects(details) {
        return new CategoryDegree(details).save()
    }

    deleteDegree(id) {
        return CategoryDegree.deleteMany({ _id: { $in: id } })

    }
    getAllDegrees() {
        return CategoryDegree.find()
    }

}
module.exports = new DegreeCategory(); 
