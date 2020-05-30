const freelancerService = require('../../services/freelancer');
const CustomerService = require('../../services/customer');
const FreelanceServices = require('../../services/FreelanceService');
const ServiceOrder = require('../../services/service_order');
const cryptoRandomString = require('crypto-random-string');
const stripe = require('stripe')('sk_test_0KziHudfqX3n3AoV3BSWBnw900IGCvE5yH');
const mongoose = require('mongoose');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class FreelancerServiceController {

    async addService(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let uniqueId;
            var total_amount = 0;


            while (1) {
                uniqueId = cryptoRandomString({ length: 10, type: 'numeric' });

                let order = await ServiceOrder.getOrder({ order_id: uniqueId })
                if (!order) break;
                else continue;
            }
            data.order_id = uniqueId;


            stripe.customers.create({
                name: data.name,
                email: data.email,
                source: data.stripeToken //in web .stripeToken
            }).then(customer => stripe.charges.create({
                amount: data.price * 100,
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
                let addOrder = await ServiceOrder.addOrder(data)

                return res.status(200).send(ResponseService.success({ order: addOrder }));

            })
                .catch(err => res.status(200).send(ResponseService.failure(err)));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async cancelOrder(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.order_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);
            if (!data.reason) throw new apiError.ValidationError('reason', message.REQUIRED);
            if (!data.cancelled_date) throw new apiError.ValidationError('Cancelled date', message.REQUIRED);

            let criteria = {
                _id: data.order_id
            }
            let details = {
                cancelled_by: 2,
                reason: data.reason,
                cancelled_date: data.cancelled_date,
                status: 4
            }
            let updateOrder = await ServiceOrder.updateOrder(criteria, details);

            return res.status(200).send(ResponseService.success({ order: updateOrder }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async markCompleted(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.order_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);

            let criteria = {
                _id: data.order_id
            }
            let details = {
                status: 3
            }

            let updateOrder = await ServiceOrder.updateOrder(criteria, details);

            return res.status(200).send(ResponseService.success({ order: updateOrder }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getOneOrder(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.order_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);

            let criteria = {
                _id: data.order_id,
            }


            let getOneOrders = await ServiceOrder.getOrder(criteria);
            let response = Object.assign({}, getOneOrders.toJSON());

            let freelancer = await freelancerService.getFreelancer({_id: getOneOrders.freelancer_id})

            response.freelancer_name = freelancer.name


            return res.status(200).send(ResponseService.success({ order: response }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getInProcessOrders(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.customer_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);

            let criteria = {
                customer_id: data.customer_id,
                status: 2
            }


            let getAllOrders = await ServiceOrder.getAllOrders(criteria);

            return res.status(200).send(ResponseService.success({ order: getAllOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getCompletedOrders(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.customer_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);

            let criteria = {
                customer_id: data.customer_id,
                status: 3
            }


            let getAllOrders = await ServiceOrder.getAllOrders(criteria);

            return res.status(200).send(ResponseService.success({ order: getAllOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getCancelledOrders(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.customer_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);

            let criteria = {
                customer_id: data.customer_id,
                status: 4
            }


            let getAllOrders = await ServiceOrder.getAllOrders(criteria);

            return res.status(200).send(ResponseService.success({ order: getAllOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async disputeOrder(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.customer_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);
            if (!data.dispute_reason) throw new apiError.ValidationError('dispute reason', message.REQUIRED);
            if (!data.order_id) throw new apiError.ValidationError('order id', message.ID_REQUIRED);



            let criteria = {
                _id: data.order_id
            }
            let details = {
                status: 5,
                "dispute.dispute_reason": data.dispute_reason,
                "dispute.disputed_by": 1
            }


            let openDispute = await ServiceOrder.updateOrder(criteria, details);

            return res.status(200).send(ResponseService.success({ disputedOrder: openDispute }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

}


module.exports = new FreelancerServiceController();