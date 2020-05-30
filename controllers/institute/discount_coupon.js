const InstituteService = require('../../services/institute');
const InstructorService = require('../../services/instructor');
const CourseService = require('../../services/course');



const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');




class Discount_coupon {

    async addDiscountCoupon(req, res) {

        try {
            let id = req.param('id')
            let data = Object.assign({}, req.body);
            /**
             *  req.body will be.... 
             *  starting date
             *  ending date
             *  @param = course id 
             *  discount price
             *
             */
            // data.starting_date = new Date(data.starting_date).toISOString()
            // data.ending_date = new Date(data.ending_date).toISOString()

            let add_coupon = await InstructorService.addCoupon({_id:id}, data);

                return res.status(200).send(ResponseService.success({ coupon: add_coupon }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }


}

module.exports = new Discount_coupon();