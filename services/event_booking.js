const Event_Booking = require('../models/event_booking');


class EventBookingService {

    newBooking(details){
        return new Event_Booking(details).save();
    }

    getOneBooking(criteria){
        return Event_Booking.findOne(criteria);
    }

    getAllBookings(criteria){
        return Event_Booking.find(criteria);
    }

    updateBookings(criteria, details){
        return Event_Booking.updateMany(criteria, details, {multi:true});
    }

    cancelBooking(criteria, details){
        return Event_Booking.findOneAndUpdate(criteria, details)
    }
}

module.exports = new EventBookingService();