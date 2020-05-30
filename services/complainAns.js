

// const Student = require('../models/student')
const ComplainAnsModel = require('../models/complainAns')


class ComplainAns {
    // findProfessor(request) {
    //     return Instructor.findById(request)
    // }
    findStudent(request) {
        // return Student.findOne(request)
        return false
    }
    createAns(details){
        return new ComplainAnsModel(details).save()
    }
    
}
module.exports = new ComplainAns(); 
