const Course_Order = require('../models/course_order');



class CourseOrderService {

    async addOrder(details) {

        let order = await new Course_Order(details).save(); 

        return order;
    }
    updateOrder(criteria, details) {
        return Course_Order.findOneAndUpdate(criteria, details);
    }

    getOrder(request) {
        return Course_Order.findOne(request);
    }
    getTotalOrders(criteria) {
        return Course_Order.find(criteria);
    }

    addProgress(criteria, details) {
        return Course_Order.update(
            {
                'courses._id': criteria.course_id,
                _id: criteria.order_id
            }
            , {
                // courses: [{
                // $push: {
                //         progress:[ { abcd: "cd" }]

                //     }
                // }]
                $push: {
                    'courses.0.progress': { topic_id: details.topic_id }
                }

            })
    }

    checkProgress(criteria){
        return Course_Order.findOne({'courses.progress.topic_id': criteria.topic_id })
    }
   
    getOrdersForCourses(criteria) {
        return Course_Order.find({ customer_id: criteria.customer_id },
            { courses: { $elemMatch: { course_id: criteria.course_id } } })
    }

    getTotalOrdersCount(criteria) {
        return Course_Order.countDocuments(criteria);
    }

    getTotalSale() {

        return Course_Order.aggregate([
            { $group: { _id: null, amount: { $sum: "$total_amount" } } }
        ])

    }
    getStoreTotalSale(criteria) {
        return Course_Order.aggregate([
            { $match: criteria },
            { $group: { _id: null, amount: { $sum: "$total_amount" } } }
        ])
    }
    getCourseSales(criteria) {
        return Course_Order.find(
            { courses: { $elemMatch: { institute_id: criteria.institute_id } } })
    }
    getInstructorCourseSales(criteria) {
        return Course_Order.find(
            { courses: { $elemMatch: { instructor_id: criteria.instructor_id } } })
    }
}

module.exports = new CourseOrderService();