const InstituteService = require('../../services/institute');
const EventService = require('../../services/event');
const EventBookingService = require('../../services/event_booking');
const CustomerService = require('../../services/customer');

const mongoose = require('mongoose');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class EventController {

    async addEvent(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.institute_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            let getInstitute = await InstituteService.getInstitute({ _id: data.institute_id });
            if (!getInstitute) throw new apiError.ValidationError('id', message.ID_INVALID);

            if (req.files) {

                data.picture = req.files[0].filename;
            }

            data.remaining_seats = data.total_seats

            let addEvent = await EventService.createEvent(data);

            return res.status(200).send(ResponseService.success({ event: addEvent }));

        } catch (e) {
            return res.status(e || 200).send(ResponseService.failure(e));

        }
    }

    async updateEvent(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.institute_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            let getInstitute = await InstituteService.getInstitute({ _id: data.institute_id });
            if (!getInstitute) throw new apiError.ValidationError('id', message.ID_INVALID);

           if(req.files) if(req.files.length > 0) if (req.files[0].filename) data.picture = req.files[0].filename;

            let criteria = {
                _id: mongoose.Types.ObjectId(data.event_id),
                institute_id: mongoose.Types.ObjectId(data.institute_id)
            }

            delete data.institute_id;

            let updatedEvent = await EventService.updateEvent(criteria, data);

            return res.status(200).send(ResponseService.success({ updateEvent: updatedEvent }));

        } catch (e) {
            return res.status(e || 200).send(ResponseService.failure(e));

        }
    }

    async getEvent(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.institute_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            let getInstitute = await InstituteService.getInstitute({ _id: data.institute_id });
            if (!getInstitute) throw new apiError.ValidationError('id', message.ID_INVALID);

            let criteria = {
                _id: mongoose.Types.ObjectId(data.event_id),
                institute_id: mongoose.Types.ObjectId(data.institute_id)
            }

            let criteria = {
                _id: mongoose.Types.ObjectId(data.event_id),
                institute_id: mongoose.Types.ObjectId(data.institute_id)
            }

 
            let event = await EventService.getEvent(criteria);

            return res.status(200).send(ResponseService.success({ event: event }));

        } catch (e) {

            return res.status(e || 200).send(ResponseService.failure(e));

        }
    }

    async getManyEvents(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.institute_id) throw new apiError.ValidationError('id', message.ID_INVALID);

            let getInstitute = await InstituteService.getInstitute({ _id: data.institute_id });
            if (!getInstitute) throw new apiError.ValidationError('id', message.ID_INVALID);

            let criteria = {
                // _id: mongoose.Types.ObjectId(data.event_id),
                institute_id: mongoose.Types.ObjectId(data.institute_id)
            }


            let events = await EventService.getManyEvents(criteria);

            return res.status(200).send(ResponseService.success({ events: events }));

        } catch (e) {

            return res.status(e || 200).send(ResponseService.failure(e));

        }
    }

    async getEventBookings(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let bookings = []
            let criteria = {
                event_id: mongoose.Types.ObjectId(data.event_id)
            }

            let getEventBookings = await EventBookingService.getAllBookings(criteria)
            if (getEventBookings.length > 1) {
                for (let j = 0; j < getEventBookings.length; j++) {
                    bookings.push(getEventBookings[j].toJSON());
                }
            } else if (getcourses.length = !0) {
                bookings.push(getEventBookings[0].toJSON());
            }
            //start
            for (let i = 0; i < bookings.length; i++) {
                let criteria2 = {
                    _id: bookings[i].customer_id
                }

                let getCustomer = await CustomerService.getCustomer(criteria2);


                bookings[i].customer_name = getCustomer.name;
                bookings[i].customer_mobile_no = getCustomer.mobile_no;

            }
            //end
            return res.status(200).send(ResponseService.success({ bookings: bookings }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async changeEventStatus(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getInstitute = await InstituteService.getInstitute({ _id: mongoose.Types.ObjectId(data.institute_id) });
            if (!getInstitute) throw new apiError.ValidationError('id', message.ID_INVALID);

            let getEvent = await EventService.getEvent({ _id: data.event_id });
            if (!getEvent) throw new apiError.ValidationError('id', message.ID_INVALID);

            let details = {
                status: data.status
            }
            let criteria = {
                _id: mongoose.Types.ObjectId(data.event_id)
            }
            let eventStatusChanged = await EventService.updateEvent(criteria, details);

            let details2 = {
                status: eventStatusChanged.status
            }
            let criteria2 = {
                event_id: mongoose.Types.ObjectId(eventStatusChanged._id)
            }

            if (eventStatusChanged) await EventBookingService.updateBookings(criteria2, details2);

            return res.status(200).send(ResponseService.success({ statusChanged: eventStatusChanged }));

        } catch (e) {

            return res.status(e || 200).send(ResponseService.failure(e));

        }
    }
};

module.exports = new EventController();