const Course = require('../models/course');


class CourseService {

    searchCourse(criteria) {

        // let condition = {


        //                     //  keywords: new RegExp(criteria.keyword, 'i'),
        //                  promo_video: { "$regex":"2019", "$options": "i" } 


        // }
        // tags: {
        //     $in: [
        //       <ObjectId1>,
        //       <ObjectIdX>,
        //       // other tags ids
        //     ]
        //   } 
        // let condition = {
          
        //     keywords: {
        //         $in: [
        //             "hy", "by"
        //             //  criteria.keyword
        //             // other tags ids
        //         ]
        //     }


        // }
        // const regex = new RegExp("intro", "si")

        return Course.find({ $text: {$search: criteria.keyword}});
    }
    createCourse(details) {
        return new Course(details).save()
    }

    getCourse(request) {
        return Course.findOne(request)
    }
    getAllCourse(request) {
        return Course.find(request)
    }
    getManyCourses(criteria) {
        return Course.find(criteria);
    }
    getFeaturedCourses(criteria) {
        return Course.find({ "price.discount_price": { $ne: null } })
    }
    getFilteredCourses(criteria) {
        return Course.find({ $or: [{ degree: criteria.degree }, { subject: criteria.subject }] })
    }

    getAllCourses() {
        return Course.find();
    }

    updateCourse(criteria, details) {
        return Course.findOneAndDelete(criteria, details, { new: true }).save()
    }

    deleteCourse(criteria) {
        return Course.findOneAndDelete(criteria);
    }
}


module.exports = new CourseService();