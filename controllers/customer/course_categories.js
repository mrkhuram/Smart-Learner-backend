
const CourseCategoryService = require('../../services/degreeCategory');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');

class CourseCategoryController {

   async getAllCategories(req, res){
        try{
            let allCategories = await CourseCategoryService.getAllCategories();
            res.status(200).send(ResponseService.success({categories: allCategories}));
        }catch(e){
            return res.status(200).send(ResponseService.failure(e));
        }
    }

}


module.exports = new CourseCategoryController();