const InstructorService = require('../../services/instructor');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');




class Discount_coupon {

    async addDiscountCoupon(req, res) {
        try {
            let id = req.param('id')
            let data = Object.assign({}, req.body);

            data.coupon_code = data.coupon_code.toLowerCase();
 
            // let getInstructor = await InstructorService.getInstructor({ _id: id });
            // if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);
            data.instructor.id = id
            let instructorName = await InstructorService.findName({_id : id})
            data.instructor.name = instructorName.email
            data.added_by.userId = id
            data.added_by.title = instructorName.email
            let add_coupon = await InstructorService.addCoupon(data);

            return res.status(200).send(ResponseService.success({ coupon: add_coupon }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    
}

module.exports = new Discount_coupon();