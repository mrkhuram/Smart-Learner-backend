const Messaging = require('../models/messagiing');


class MessagingServices {

    sendMessage(details){
        return new Messaging(details).save();
    }

    reply(criteria, details){
        // return Messaging.update(criteria, "chat details, {new: true});
        return Messaging.update(
            criteria , {
                $push: {
                    'chat': { sender: details.sender, body: details.body }
                }

            })
    }

    getThread(criteria){
        return Messaging.findOne(criteria);
    }

    getAllThread(criteria){
        return Messaging.find(criteria);
    }

}


module.exports = new MessagingServices();