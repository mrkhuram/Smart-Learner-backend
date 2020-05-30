const CourseService = require('../../services/course');
const InstructorService = require('../../services/instructor');
const InstituteService = require('../../services/institute');
const CustomerService = require('../../services/customer');
const CourseOrderService = require('../../services/course_order');
const TransactionService = require('../../services/transaction');
const ChapterService = require('../../services/chapter');

const stripe = require('stripe')('sk_test_0KziHudfqX3n3AoV3BSWBnw900IGCvE5yH');
const cryptoRandomString = require('crypto-random-string');
const mongoose = require('mongoose');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class CourseOrderController {

  async placeOrder(req, res) {
    try {

      let request = Object.assign({}, req.body);
      let orderDetails = {
        courses: []
      };
      let courses = request.courses;
      var total_amount = 0;
      let uniqueId;

      //Checking is customer is exist or not
      let getcustomer = await CustomerService.getCustomer({ _id: request.customer_id });
      if (!getcustomer) throw new apiError.ValidationError('id', message.CUSTOMER_NOT_FOUND);
      console.log(getcustomer);

      //Checking is uniqueId is already exist or not
      while (1) {
        uniqueId = cryptoRandomString({ length: 10, type: 'numeric' });

        let order = await CourseOrderService.getOrder({ order_id: uniqueId })
        if (!order) break;
        else continue;
      }
      orderDetails.order_id = uniqueId;

      // getting course details for order and transaction
      if (courses.length > 0) {

        for (let i = 0; i < courses.length; i++) {

          let course = await CourseService.getCourse({ _id: courses[i].id })
          if (course) {
            let courseDetails = {};
            if (course.price.price_type == 1) {

              if (course.price.discount_price > 0) {
                total_amount += course.price.discount_price
                courseDetails.price = course.price.discount_price;

              } else {
                total_amount += course.price.origional_amount
                courseDetails.price = course.price.origional_amount;
              }
            }
            let instructor = await InstructorService.getInstructor({ _id: course.instructor_id })
            let topics = await ChapterService.getChapters({course_id: course.id, parent: null})
            courseDetails.institute_id = course.institute_id;
            courseDetails.instructor_id = instructor._id;
            courseDetails.instructor_name = instructor.name;
            courseDetails.course_id = course.id;
            courseDetails.name = course.english_tittle;
            courseDetails.thumbnail = course.thumbnail;
            courseDetails.topics = topics.length

            orderDetails['courses'].push(courseDetails);
          }
          console.log(orderDetails, total_amount);

        }
        orderDetails.total_amount = total_amount
        orderDetails.customer_id = getcustomer.id

      } else {
        let courseDetails = {};
        if (course.price.price_type == 1) {

          if (course.price.discount_price > 0) {
            total_amount = course.price.discount_price
            courseDetails.price = course.price.discount_price;

          } else {
            total_amount = course.price.origional_amount
            courseDetails.price = course.price.origional_amount;
          }
        }
        let instructor = await InstructorService.getInstructor({ _id: course.instructor_id })
        courseDetails.institute_id = course.institute_id;
        courseDetails.instructor_id = instructor._id;
        courseDetails.instructor_name = instructor.name;
        courseDetails.course_id = course.id;
        courseDetails.name = course.english_tittle;
        courseDetails.thumbnail = course.thumbnail;

        orderDetails.total_amount = total_amount
        orderDetails.customer_id = getcustomer.id

        // orderDetails['courses'].push(courseDetails)
      }

      stripe.customers.create({
        name: req.body.name,
        email: req.body.email,
        source: req.body.stripeToken //in web .stripeToken
      }).then(customer => stripe.charges.create({
        amount: total_amount * 100,
        currency: "usd",
        customer: customer.id
      })).then(async customer => {
        let details = {
          transaction_id: customer.balance_transaction,
          transaction_owner: getcustomer.id,
          charges_id: customer.id,
          created_stamp: customer.created,
          stripe_customer_id: customer.customer,
          brand: customer.payment_method_details.card.brand,
          fingerprint: customer.payment_method_details.card.fingerprint,
          last4: customer.payment_method_details.card.last4,
          network: customer.payment_method_details.card.network,
          status: customer.status
        }
        let transaction = await TransactionService.addTransaction(details);
        let courseOrder = await CourseOrderService.addOrder(orderDetails);
        res.status(200).send(ResponseService.success({ customer: customer }))
      })
        .catch(err => res.status(200).send(ResponseService.failure(err)));

    } catch (e) {
      return res.status(200).send(ResponseService.failure(e));
    }
  }

  async getOrderedCourses(req, res) {
    try {
      let data = Object.assign({}, req.body);

      let customer = await CustomerService.getCustomer({ _id: data.customer_id });
      if (!customer) throw new apiError.ValidationError('id', message.CUSTOMER_NOT_FOUND);

      let orders = await CourseOrderService.getTotalOrders({ customer_id: customer._id });
      if (!orders) throw new apiError.ValidationError('orders', message.NOT_FOUND);

      return res.status(200).send(ResponseService.success({ orders: orders }));

    } catch (e) {
      return res.status(200).send(ResponseService.failure(e));
    }
  }


  //     console.log(orderDetails, total_amount);

  //         return res.status(200).send(ResponseService.success({ orderDetails, total_amount }));


  //     } catch (e) {
  //     return res.status(e.code || 200).send(ResponseService.failure(e));
  // }


  // async placeOrder(req, res){
  //         try {
  //           stripe.customers
  //             .create({
  //               name: req.body.name,
  //               email: req.body.email,
  //               source: req.body.stripeToken
  //             })
  //             .then(customer =>
  //               stripe.charges.create({
  //                 amount: req.body.amount * 100,
  //                 currency: "usd",
  //                 customer: customer.id
  //               })
  //             )
  //             .then(() => res.render("completed.ejs"))
  //             .catch(err => console.log(err));
  //         } catch (err) {
  //           res.send(err);
  //         }
  // }

  async addProgress(req, res) {
    try {
      let data = Object.assign({}, req.body);

      let details = {
       topic_id: data.topic_id
      } 
        
      let criteria = {
        course_id: data.course_id,
        order_id: data.order_id
      }

      let checkProgress = await CourseOrderService.checkProgress(details)
      if(!checkProgress){
        let progressAdded = await CourseOrderService.addProgress(criteria, details);
      }
      
      return res.status(200).send(ResponseService.success({ progress: true }));

    } catch (e) {
      return res.status(200).send(ResponseService.failure(e));

    }
  }

}

module.exports = new CourseOrderController();