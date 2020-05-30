const FreelancerService = require('../../services/freelancer');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');




class FreelancerController{
    async updateFreelancer(req, res){
        try{
            
            let data = Object.assign({}, req.body);
            if(!data.email) throw new apiError.ValidationError('email', message.EMAIL_REQUIRED);
            if(!data.password) throw new apiError.ValidationError('password', message.PASSWORD_REQUIRED);

            data.email = data.email.toLowerCase();

            let getFreelancer = await FreelancerService.getFreelancer({_id : data.id});
            if(!getFreelancer) throw new apiError.ValidationError('email', message.ID_INVALID);
            
            let update_Freelancer = await FreelancerService.updateFreelancer(data, {email: data.email});

            return res.status(200).send(ResponseService.success({freelancer: update_Freelancer}));

        }catch(e){
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}

module.exports = new FreelancerController();