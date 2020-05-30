const CourseService = require('../../services/course');
const ReviewService = require('../../services/review');
const ChapterService = require('../../services/chapter');
const InstructorService = require('../../services/instructor');
const InstituteService = require('../../services/institute');
const CustomerService = require('../../services/customer');
const CourseOrderService = require('../../services/course_order');


const mongoose = require('mongoose');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');

class CourseController {

    async searchCourse(req, res){
        try{
            let data = Object.assign({}, req.body)
            let criteria = {
                keyword : data.keyword
            }
            let getCourses = await CourseService.searchCourse(criteria)
            return res.status(200).send(ResponseService.success({ course: getCourses }));


        }catch(e){
            return res.status(500).send(ResponseService.failure(e));


        }
    }

    async getCourse(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let criteria = {
                _id: mongoose.Types.ObjectId(data.course_id)
            }
            let course = await CourseService.getCourse(criteria)
            let criteria2 = {
                course_id: course.id,
                parent: null
            }
            let chapters = await ChapterService.getChapters(criteria2)

            let instructor = await InstructorService.getInstructor({ _id: course.instructor_id });
            let instructorReviews = await ReviewService.getAllReview({ instructor_id: mongoose.Types.ObjectId(instructor.id) });

            let institute = await InstituteService.getOneInstitute({ _id: course.institute_id });


            let totalreviwer = instructorReviews.length;

            let stars = 0;
            let averageStar = 0
            if (instructorReviews.length != 0) {
                for (let j = 0; j < instructorReviews.length; j++) {
                    stars += instructorReviews[j].star;
                    console.log(stars)
                }
                averageStar = stars / 5;
                let obj = {
                    stars: averageStar
                }

            }

            // let mergeCourse = Object.assign({}, chapters);

            let response = {
                english_tittle: course.english_tittle,
                arabic_tittle: course.arabic_tittle,
                english_sub_tittle: course.english_sub_tittle,
                arabic_sub_tittle: course.arabic_sub_tittle,
                english_description: course.english_description,
                arabic_description: course.arabic_description,
                instructor_name: instructor.name,
                instructor_id: instructor.id,
                instructor_picture: instructor.picture,
                instructor_stars: averageStar,
                instructor_totalreviwer: totalreviwer,
                institute_name: institute.name,
                institute_id: institute.id,
                course_id: course.id,
                origional_price: course.price.origional_amount,
                discount_price: course.price.discount_price,
                promovideo: course.promo_video,
                chapter: chapters,
                stars: course.stars,
                totalReviwers: course.totalReviwers

            }


            return res.status(200).send(ResponseService.success({ course: response }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getCoursesByCategory(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let courses = []
            let star = 0
            let averageStar = 0

            if (!data.category_id) throw new apiError.ValidationError('category_id', message.ID_INVALID)
            //Set criteria according to your requirements
            let criteria = {
                category: mongoose.Types.ObjectId(data.category_id)
            }

            let getCoursesByCategory = await CourseService.getManyCourses(criteria)
            if (getCoursesByCategory.length > 1) {
                for (let j = 0; j < getCoursesByCategory.length; j++) {
                    courses.push(getCoursesByCategory[j].toJSON());
                }
            } else if (getCoursesByCategory.length != 0){

                courses.push(getCoursesByCategory[0].toJSON());
            }

            for (let i = 0; i < courses.length; i++) {
                let criteria2 = {
                    course_id: courses[i]._id
                }
                let reviews = await ReviewService.getAllReview(criteria2);
                let instructor = await InstructorService.getInstructor({ _id: courses[i].instructor_id });
                let institute = await InstituteService.getInstitute({ _id: courses[i].institute_id });
                if (reviews.length != 0) {
             
                    for (let j = 0; j < reviews.length; j++) {
                        star += reviews[j].star;
                        console.log(star)
                    }
                     averageStar = star / 5;
                    let obj = {
                        stars: averageStar
                    }

                    courses[i].stars = averageStar;

                }else {
                    averageStar = 0
                }
                courses[i].totalReviwers = reviews.length;
                courses[i].stars = averageStar;
                courses[i].instructor_name = instructor.name;
                courses[i].instructor_picture = instructor.picture;
                courses[i].institute_name = institute.name;
                courses[i].institute_picture = institute.picture;
            }
            return res.status(200).send(ResponseService.success({ course: courses }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getManycourses(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let courses = []
            let star = 0
            let averageStar = 0
            //Set criteria according to your requirements
            let criteria = {
                subject: mongoose.Types.ObjectId(data.subject_id)
            }

            let getcourses = await CourseService.getManyCourses(criteria)
            if (getcourses.length > 1) {
                for (let j = 0; j < getcourses.length; j++) {
                    courses.push(getcourses[j].toJSON());
                }
            } else if(getcourses.length =!0) {
                courses.push(getcourses[0].toJSON());
            }
            //start
            for (let i = 0; i < courses.length; i++) {
                let criteria2 = {
                    course_id: courses[i]._id
                }
                let reviews = await ReviewService.getAllReview(criteria2);
                let instructor = await InstructorService.getInstructor({ _id: courses[i].instructor_id });
                let institute = await InstituteService.getInstitute({ _id: courses[i].institute_id });
                if (reviews.length != 0) {
                 
                    for (let j = 0; j < reviews.length; j++) {
                        star += reviews[j].star;
                        console.log(star)
                    }
                     averageStar = star / 5;
                    let obj = {
                        stars: averageStar
                    }

                    courses[i].stars = averageStar;
                }else {
                    averageStar = 0
                }
                courses[i].totalReviwers = reviews.length;
                courses[i].stars = averageStar;
                courses[i].instructor_name = instructor.name;
                courses[i].instructor_picture = instructor.picture;
                courses[i].institute_name = institute.name;
                courses[i].institute_picture = institute.picture;

            }
            //end
            return res.status(200).send(ResponseService.success({ course: courses }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getFeaturedcourses(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let courses = []
            let star = 0
            let averageStar = 0

            let criteria = {
                "price.discount_price": null
            }
            let getcourses = await CourseService.getFeaturedCourses(criteria)
            if (getcourses.length > 1) {
                for (let j = 0; j < getcourses.length; j++) {
                    courses.push(getcourses[j].toJSON());
                }
            } else if(getcourses.length != 0) {
                courses.push(getcourses[0].toJSON());
            }

            for (let i = 0; i < courses.length; i++) {
                let criteria2 = {
                    course_id: courses[i]._id
                }
                let reviews = await ReviewService.getAllReview(criteria2);
                let instructor = await InstructorService.getInstructor({ _id: courses[i].instructor_id });
                let institute = await InstituteService.getInstitute({ _id: courses[i].institute_id });
                if (reviews.length != 0) {
                
                    for (let j = 0; j < reviews.length; j++) {
                        star += reviews[j].star;
                        console.log(star)
                    }
                     averageStar = star / 5;
                    let obj = {
                        stars: averageStar
                    }

                    courses[i].stars = averageStar;

                }else {
                    averageStar = 0
                }
                courses[i].totalReviwers = reviews.length;
                courses[i].stars = averageStar;
                courses[i].instructor_name = instructor.name;
                courses[i].instructor_picture = instructor.picture;
                courses[i].institute_name = institute.name;
                courses[i].institute_picture = institute.picture;
            }

            return res.status(200).send(ResponseService.success({ course: courses }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getTrendingcourses(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let courses = []
            let star = 0
            let averageStar = 0
            //Set criteria according to your requirements
            let criteria = {
                is_best_selling: true
            }
            let getcourses = await CourseService.getManyCourses(criteria)
            if (getcourses.length > 1) {
                for (let j = 0; j < getcourses.length; j++) {
                    courses.push(getcourses[j].toJSON());
                }
            } else if(getcourses.length != 0){
                courses.push(getcourses[0].toJSON());
            }

            for (let i = 0; i < courses.length; i++) {
                let criteria2 = {
                    course_id: courses[i]._id
                }
                let reviews = await ReviewService.getAllReview(criteria2);
                let instructor = await InstructorService.getInstructor({ _id: courses[i].instructor_id });
                let institute = await InstituteService.getInstitute({ _id: courses[i].institute_id });
                if (reviews.length != 0) {
                    
                    for (let j = 0; j < reviews.length; j++) {
                        star += reviews[j].star;
                        console.log(star)
                    }
                     averageStar = star / 5;
                    let obj = {
                        stars: averageStar
                    }

                    courses[i].stars = averageStar;

                }else {
                    averageStar = 0
                }
                courses[i].totalReviwers = reviews.length;
                courses[i].stars = averageStar;
                courses[i].instructor_name = instructor.name;
                courses[i].instructor_picture = instructor.picture;
                courses[i].institute_name = institute.name;
                courses[i].institute_picture = institute.picture;
            }

            return res.status(200).send(ResponseService.success({ course: courses }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getFilteredcourses(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let courses = []
            let star = 0
            let averageStar = 0

            //Set criteria according to your requirements
            for (let i = 0; i < data.subjects.length; i++) {

                let criteria = {
                    subject: mongoose.Types.ObjectId(data.subjects[i])
                    // degree: mongoose.Types.ObjectId(data.degree_id)
                }

                let getCourse = await CourseService.getManyCourses(criteria)
                if (getCourse.length > 1) {
                    for (let j = 0; j < getCourse.length; j++) {
                        courses.push(getCourse[j].toJSON());
                    }
                } else if(getCourse.length != 0) {

                    courses.push(getCourse[0].toJSON());
                }
            }

            for (let i = 0; i < courses.length; i++) {
                let criteria2 = {
                    course_id: courses[i]._id
                }
                let reviews = await ReviewService.getAllReview(criteria2);
                let instructor = await InstructorService.getInstructor({ _id: courses[i].instructor_id });
                let institute = await InstituteService.getInstitute({ _id: courses[i].institute_id });

                if (reviews.length != 0) {
                    for (let j = 0; j < reviews.length; j++) {
                        star += reviews[j].star;
                        console.log(star)
                    }
                    averageStar = star / 5;
                    let obj = {
                        stars: averageStar
                    }

                    courses[i].stars = averageStar;

                } else {
                    averageStar = 0
                }
                courses[i].totalReviwers = reviews.length;
                courses[i].stars = averageStar;
                courses[i].instructor_name = instructor.name;
                courses[i].instructor_picture = instructor.picture;
                courses[i].institute_name = institute.name;
                courses[i].institute_picture = institute.picture;
            }
            return res.status(200).send(ResponseService.success({ courses: courses }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getInstructorCourses(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let courses = []
            let star = 0
            let averageStar = 0
            //Set criteria according to your requirements
            let criteria = {
                instructor_id: mongoose.Types.ObjectId(data.instructor_id)
            }
            let getcourses = await CourseService.getManyCourses(criteria)
            if (getcourses.length > 1) {
                for (let j = 0; j < getcourses.length; j++) {
                    courses.push(getcourses[j].toJSON());
                }
            } else if(getcourses.length != 0){
                courses.push(getcourses[0].toJSON());
            }
            for (let i = 0; i < courses.length; i++) {
                let criteria2 = {
                    course_id: courses[i]._id
                }
                let reviews = await ReviewService.getAllReview(criteria2);
                let instructor = await InstructorService.getInstructor({ _id: courses[i].instructor_id });
                let institute = await InstituteService.getInstitute({ _id: courses[i].institute_id });
                if (reviews.length != 0) {
              
                    for (let j = 0; j < reviews.length; j++) {
                        star += reviews[j].star;
                        console.log(star)
                    }
                     averageStar = star / 5;
                    let obj = {
                        stars: averageStar
                    }

                    courses[i].stars = averageStar;

                }else {
                    averageStar = 0
                }
                courses[i].totalReviwers = reviews.length;
                courses[i].stars = averageStar; 
                courses[i].instructor_name = instructor.name;
                courses[i].instructor_picture = instructor.picture;
                courses[i].institute_name = institute.name;
                courses[i].institute_picture = institute.picture;
            }
            return res.status(200).send(ResponseService.success({ course: courses }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getInstituteCourses(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let courses = []
            let star = 0
            let averageStar = 0
            //Set criteria according to your requirements
            let criteria = {
                institute_id: mongoose.Types.ObjectId(data.institute_id)
            }
            let getcourses = await CourseService.getManyCourses(criteria)
            if (getcourses.length > 1) {
                for (let j = 0; j < getcourses.length; j++) {
                    courses.push(getcourses[j].toJSON());
                }
            } else if(getcourses.length != 0) {
                courses.push(getcourses[0].toJSON());
            }
            for (let i = 0; i < courses.length; i++) {
                let criteria2 = {
                    course_id: courses[i]._id
                }
                let reviews = await ReviewService.getAllReview(criteria2);
                let instructor = await InstructorService.getInstructor({ _id: courses[i].instructor_id });
                let institute = await InstituteService.getInstitute({ _id: courses[i].institute_id });
                if (reviews.length != 0) {
                    for (let j = 0; j < reviews.length; j++) {
                        star += reviews[j].star;
                        console.log(star)
                    }
                     averageStar = star / 5;
                    let obj = {
                        stars: averageStar
                    }

                    courses[i].stars = averageStar;

                }else {
                    averageStar = 0
                }
                courses[i].totalReviwers = reviews.length;
                courses[i].stars = averageStar;
                courses[i].instructor_name = instructor.name;
                courses[i].instructor_picture = instructor.picture;
                courses[i].institute_name = institute.name;
                courses[i].institute_picture = institute.picture;
            }
            return res.status(200).send(ResponseService.success({ course: courses }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }


    async getAllcourses(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let courses = []
            let star = 0
            let averageStar = 0

            let getAllCourses = await CourseService.getAllCourses();
            if (getAllCourses.length > 1) {
                for (let j = 0; j < getAllCourses.length; j++) {
                    courses.push(getAllCourses[j].toJSON());
                }
            } else if(getAllCourses.length != 0) {
                courses.push(getAllCourses[0].toJSON());
            }

            for (let i = 0; i < courses.length; i++) {
                let criteria2 = {
                    course_id: courses[i]._id
                }
                let reviews = await ReviewService.getAllReview(criteria2);
                let instructor = await InstructorService.getInstructor({ _id: courses[i].instructor_id });
                let institute = await InstituteService.getInstitute({ _id: courses[i].institute_id });
                if (reviews.length != 0) {
                    for (let j = 0; j < reviews.length; j++) {
                        star += reviews[j].star;
                        console.log(star)
                    }
                     averageStar = star / 5;
                    let obj = {
                        stars: averageStar
                    }

                    courses[i].stars = averageStar;

                } else {
                    averageStar = 0
                }
                courses[i].totalReviwers = reviews.length;
                courses[i].stars = averageStar;
                courses[i].instructor_name = instructor.name;
                courses[i].instructor_picture = instructor.picture;
                courses[i].institute_name = institute.name;
                courses[i].institute_picture = institute.picture;
            }
            return res.status(200).send(ResponseService.success({ course: courses }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    //Purchased Section

    async getPurchasedCourse(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCustomer = await CustomerService.getCustomer({ _id: data.customer_id })
            if (!getCustomer) throw new apiError.ValidationError('customer', message.NOT_FOUND);
            let details = {
                customer_id: getCustomer.id,
                course_id: data.course_id
            }
            let getOrder = await CourseOrderService.getOrdersForCourses(details);
            if (!getOrder) throw new apiError.ValidationError('course', message.NOT_FOUND)

            let getCourse = await CourseService.getCourse({ _id: data.course_id });

            let course = {
                chapters: [],
                topics: []
            }
            course.tittle = getCourse.english_tittle
            course.promo_video = getCourse.promo_video
            course.order_id = getOrder.id
            let getChapters = await ChapterService.getChapters({ course_id: getCourse.id });

            for (let i = 0; i < getChapters.length; i++) {
                if (getChapters[i].parent == null) {
                    course.chapters.push(getChapters[i])
                } else {
                    course.topics.push(getChapters[i]);
                }
            }

            return res.status(200).send(ResponseService.success({ course: course }));
            // for(let i = 0; i<getOrders.length; i++){
            //     for(let j = 0; j<getOrders[i].length; j++){

            //     }
            // }

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));

        }
    }
}

module.exports = new CourseController;