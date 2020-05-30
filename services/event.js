const Event = require('../models/event');


class EventService {

    createEvent(details){
        return new Event(details).save();
    }

    updateEvent(criteria, details){
        return Event.findOneAndUpdate(criteria, details, {new: true})
    }

    getEvent(criteria){
        return Event.findOne(criteria);
    }

    getManyEvents(criteria){
        return Event.find(criteria);
    }

    getAllEvents(){
        return Event.find()
    }
};

module.exports = new EventService();