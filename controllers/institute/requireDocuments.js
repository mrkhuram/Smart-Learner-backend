const ReviewService = require('../../services/review');
const Documents = require('../../services/requireDocumets');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class ReviewController {
    async addDocument(req, res) {

        try {


            let data = Object.assign({}, req.body);

            let getCertificate = await Documents.isDocumentExist({ certificate_name: data.certificate_name });
            let getLicense = await Documents.isDocumentExist({ licenses_name: data.licenses_name });
            let getIntstitute_type = await Documents.isDocumentExist({ institute_type: data.institute_type });

            if(data.certificate_name) if (getCertificate) throw new apiError.DocumentExist('certificate exist', message.CERTIFICATE_EXIST);
            if(data.licenses_name) if (getLicense) throw new apiError.DocumentExist('License exist', message.CERTIFICATE_EXIST);
            if(data.institute_type) if (getIntstitute_type) throw new apiError.DocumentExist('Institute type exist', message.CERTIFICATE_EXIST);


            let resp = await Documents.addDocument(data);

            return res.status(200).send(ResponseService.success({ response: resp }));
        } catch (err) {
            return res.status(500).send(ResponseService.failure(err));
        }
    }

    async getAllCertificates(req, res) {
        try {

            let resp = await Documents.getAllDocuments();

            return res.status(200).send(ResponseService.success({ documents: resp }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getOneCertificate(req, res) {
        try {
            let id = req.param('id') 
            let resp = await Documents.getOneDocument({ _id: id });

            return res.status(200).send(ResponseService.success({ certificate: resp }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async updateCertificate(req, res) {
        try {
            // let id = req.param('id')
            let data = Object.assign({}, req.body);
 
            // let getCertificate = await Documents.isDocumentExist({ _id: id });

            // if (!getCertificate) throw new apiError.DocumentExist('certificate not exist', message.CERTIFICATE_NOT_EXIST);

             
            let resp = await Documents.updateCertificate(data);

            return res.status(200).send(ResponseService.success({ certificate: resp }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async deleteCertificate(req, res) {
        try {
            let id = req.param('id')
            // let data = Object.assign({}, req.body);

            let getCertificate = await Documents.isDocumentExist({ _id: id });

            if (!getCertificate) throw new apiError.DocumentExist('certificate not exist', message.CERTIFICATE_NOT_EXIST);

            
            let resp = await Documents.deleteCertificate(id); 
            resp.delete = "Successfully Deleted"
            return res.status(200).send(ResponseService.success({ certificate: resp }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}

module.exports = new ReviewController();