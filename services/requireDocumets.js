const Documents = require('../models/requireDocuments');


class DocumentServices {
    async isDocumentExist(request){
        return Documents.findOne(request) 
    }

    async addDocument(details){ 
        return new Documents(details).save()
    }

    async getAllDocuments(){
        return Documents.find()
    }
    async getOneDocument(request){
        return Documents.findOne(request)
    }
    async updateCertificate(id,request){
        return Documents.findByIdAndUpdate({_id:id},{$set: request},(err,doc)=>{console.log(doc)})
    }
    async deleteCertificate(id){
        return Documents.findByIdAndDelete({_id: id}) 
    }
}


module.exports = new DocumentServices();