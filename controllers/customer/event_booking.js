const EventBookingService = require('../../services/event_booking');
const EventService = require('../../services/event');
const CustomerService = require('../../services/customer');
const TransactionService = require('../../services/transaction');


const stripe = require('stripe')('sk_test_0KziHudfqX3n3AoV3BSWBnw900IGCvE5yH');
const cryptoRandomString = require('crypto-random-string');
const mongoose = require('mongoose');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class EventBookingController {

    async getEvent(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.event_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            let criteria = {
                _id: mongoose.Types.ObjectId(data.event_id),
            }

            let event = await EventService.getEvent(criteria);

            return res.status(200).send(ResponseService.success({ event: event }));

        } catch (e) {

            return res.status(200).send(ResponseService.failure(e));

        }
    }

    async getAllEvents(req, res) {
        try {
            let data = Object.assign({}, req.body);


            let events = await EventService.getAllEvents();

            return res.status(200).send(ResponseService.success({ events: events })); 

        } catch (e) {

            return res.status(200).send(ResponseService.failure(e));

        }
    }

    async bookEvent(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let details = Object.assign({}, data);

            while (1) {
                uniqueId = cryptoRandomString({ length: 10, type: 'numeric' });

                let order = await CourseOrderService.getOrder({ order_id: uniqueId })
                if (!order) break;
                else continue;
            }
            details.order_id = uniqueId;

            let getCustomer = await CustomerService.getCustomer({ _id: mongoose.Types.ObjectId(data.customer_id) });
            if (!getCustomer) throw new apiError.ValidationError('id', message.ID_INVALID);

            let getEvent = await EventService.getEvent({ _id: data.event_id });
            if (!getEvent) throw new apiError.ValidationError('id', message.ID_INVALID);
            if (getEvent.status != 1) throw new apiError.ValidationError('event', message.EVENT_EXPRIED);

            let total_seats = getEvent.total_seats + 1;
            let remaining_seats = getEvent.remaining_seats + JSON.parse(data.seats)
            if (total_seats == remaining_seats) throw new apiError.ValidationError('house', message.HOUSE_FULL);
            if (data.price != getEvent.price * data.seats) throw new apiError.ValidationError('payment', message.PAYMENT);
            let total_amount = getEvent.price * data.seats;


            details.english_event_tittle = getEvent.enlgish_tittle;
            details.arabic_event_tittle = getEvent.arabic_tittle;
            details.english_event_description = getEvent.english_description;
            details.arabic_event_description = getEvent.arabic_description;
            details.event_picture = getEvent.picture;
            details.date = getEvent.date;
            details.status = 1;


            stripe.customers.create({
                name: req.body.name,
                email: req.body.email,
                source: req.body.stripeToken //in web .stripeToken
            }).then(customer => stripe.charges.create({
                amount: total_amount * 100,
                currency: "usd",
                customer: customer.id
            })).then(async customer => {
                let details1 = {
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
                let transaction = await TransactionService.addTransaction(details1);
                let bookEvent = await EventBookingService.newBooking(details);


                let remainingSeats = getEvent.remaining_seats - data.seats
                let details2 = {
                    remaining_seats: remainingSeats
                }
                let criteria = {
                    _id: getEvent.id
                }
                if (bookEvent) await EventService.updateEvent(criteria, details2);

                return res.status(200).send(ResponseService.success({ bookedEvent: bookEvent }));
            })
                .catch(err => res.status(200).send(ResponseService.failure(err)));


        } catch (e) {

            return res.status(200).send(ResponseService.failure(e));

        }
    }

    async getBookedEvent(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCustomer = await CustomerService.getCustomer({ _id: mongoose.Types.ObjectId(data.customer_id) });
            if (!getCustomer) throw new apiError.ValidationError('id', message.ID_INVALID);

            if (!data.booking_id) throw new apiError.ValidationError('id', message.ID_INVALID);
            if (!data.event_id) throw new apiError.ValidationError('id', message.ID_INVALID);



            let criteria = {
                _id: mongoose.Types.ObjectId(data.booking_id),
                customer_id: mongoose.Types.ObjectId(data.customer_id)
            }
            let bookedEvent = await EventBookingService.getOneBooking(criteria);

            let getEvent = await EventService.getEvent({ _id: data.event_id });

            let mergeEvent = Object.assign({}, bookedEvent);
            mergeEvent._doc.arabic_venue = getEvent.arabic_venue;
            mergeEvent._doc.english_venue = getEvent.english_venue;
            mergeEvent._doc.time = getEvent.time;
            mergeEvent._doc.coordinates = getEvent.coordinates;
            mergeEvent._doc.remaining_seats = getEvent.remaining_seats;



            return res.status(200).send(ResponseService.success({ event: mergeEvent._doc }));

        } catch (e) {

            return res.status(200).send(ResponseService.failure(e));

        }
    }

    async getAllBookedEvents(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCustomer = await CustomerService.getCustomer({ _id: mongoose.Types.ObjectId(data.customer_id) });
            if (!getCustomer) throw new apiError.ValidationError('id', message.ID_INVALID);

            let criteria = {
                customer_id: mongoose.Types.ObjectId(data.customer_id)
            }
            let bookedEvents = await EventBookingService.getAllBookings(criteria);

            return res.status(200).send(ResponseService.success({ events: bookedEvents }));

        } catch (e) {

            return res.status(200).send(ResponseService.failure(e));

        }
    }

    async cancelEvent(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCustomer = await CustomerService.getCustomer({ _id: mongoose.Types.ObjectId(data.customer_id) });
            if (!getCustomer) throw new apiError.ValidationError('id', message.ID_INVALID);

            // let getEvent = await EventService.getEvent({ _id: data.event_id });
            if (!data.booking_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            let criteria = {
                _id: data.booking_id,
                customer_id: mongoose.Types.ObjectId(data.customer_id)
            }
            let details = {
                status: 3
            }
            let cancelEvent = await EventBookingService.cancelBooking(criteria, details);

            let getEvent = await EventService.getEvent({ _id: cancelEvent.event_id });

            let remainingSeats = getEvent.remaining_seats + cancelEvent.seats
            let details2 = {
                remaining_seats: remainingSeats
            }
            let criteria2 = {
                _id: getEvent.id
            }
            if (cancelEvent) await EventService.updateEvent(criteria2, details2);

            return res.status(200).send(ResponseService.success({ canceledEvent: cancelEvent }));

        } catch (e) {

            return res.status(200).send(ResponseService.failure(e));

        }
    }

}

module.exports = new EventBookingController();
