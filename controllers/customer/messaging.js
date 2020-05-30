
const FreelancerService = require('../../services/freelancer');
const CustomerService = require('../../services/customer');
const MessagingService = require('../../services/messaging');
const Pusher = require('pusher');
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
});
const mongoose = require('mongoose');
const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');



class MessagingController {

    // async joinChat(req, res) {
    //     try {

    //         console.log('helo')
    //         req.session.username = req.body.username;
    //         res.json('Joined');
    //     } catch (e) {
    //         return res.status(500).send(ResponseService.failure(e));

    //     }
    // }

    async auth(req, res) {
        try {
            let data = Object.assign({}, req.body);


            const socketId = data.socket_id;
            const channel = data.channel_name;
            // Retrieve username from session and use as presence channel user_id
            const presenceData = {
                user_id: data.user_id
            };
            const auth = pusher.authenticate(socketId, channel, presenceData);
            // res.send(auth);
            return res.status(200).send(ResponseService.success({ auth: auth }));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async sendmessage(req, res) {
        try {
            let data = Object.assign({}, req.body);


            pusher.trigger(data.channel_name, 'message_sent', {
                username: data.username,
                message: data.message
            });
            let details = {
                customer_id: data.customer_id,
                freelancer_id: data.freelancer_id,
                chat: [
                    {

                        sender: data.customer_id,
                        body: data.message
                    }
                ]
            }
            // res.send('message sent')
            let storeMessage = await MessagingService.sendMessage(details);
            let resp = Object.assign({}, storeMessage.toJSON());
            let getCustomer = await CustomerService.getCustomer({ _id: resp.customer_id })
            let getFreelancer = await FreelancerService.getFreelancer({ _id: resp.freelancer_id })

            resp.freelancer_name = getFreelancer.name
            resp.freelancer_picture = getFreelancer.picture
            resp.customer_name = getCustomer.name
            resp.customer_picture = getCustomer.picture
            return res.status(200).send(ResponseService.success({ storeMessage: resp }));

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));

        }
    }
    async reply(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let thread_id = "123"

            pusher.trigger(data.channel_name, 'message_sent', {
                username: data.username,
                message: data.message
            });

            let details = {
                customer_id: data.customer_id,
                freelancer_id: data.freelancer_id,
                sender: data.customer_id,
                body: data.message
            }
            let criteria = {
                _id: data.thread
            }
            // res.send('message sent')
            let storeMessage = await MessagingService.reply(criteria, details);

            let thread = await MessagingService.getThread(criteria)
            let resp = Object.assign({}, thread.toJSON());
            let getCustomer = await CustomerService.getCustomer({ _id: resp.customer_id })
            let getFreelancer = await FreelancerService.getFreelancer({ _id: resp.freelancer_id })

            resp.freelancer_name = getFreelancer.name
            resp.freelancer_picture = getFreelancer.picture
            resp.customer_name = getCustomer.name
            resp.customer_picture = getCustomer.picture


            return res.status(200).send(ResponseService.success({ storeMessage: resp }));

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));

        }
    }

    async getThread(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let criteria = {
                _id: data.thread
            }

            let thread = await MessagingService.getThread(criteria)
            let resp = Object.assign({}, thread.toJSON());
            let getCustomer = await CustomerService.getCustomer({ _id: resp.customer_id })
            let getFreelancer = await FreelancerService.getFreelancer({ _id: resp.freelancer_id })

            resp.freelancer_name = getFreelancer.name
            resp.freelancer_picture = getFreelancer.picture
            resp.customer_name = getCustomer.name
            resp.customer_picture = getCustomer.picture


            return res.status(200).send(ResponseService.success({ thread: resp }));
        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));
        }
    }
    async getCustomerThread(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let criteria = {
                customer_id: data.customer_id,
                freelancer_id: data.freelancer_id
            }

            let thread = await MessagingService.getThread(criteria)
            if (thread) {

                let resp = Object.assign({}, thread.toJSON());
                let getCustomer = await CustomerService.getCustomer({ _id: resp.customer_id })
                let getFreelancer = await FreelancerService.getFreelancer({ _id: resp.freelancer_id })

                resp.freelancer_name = getFreelancer.name
                resp.freelancer_picture = getFreelancer.picture
                resp.customer_name = getCustomer.name
                resp.customer_picture = getCustomer.picture


                return res.status(200).send(ResponseService.success({ storeMessage: resp }));
            } else {
                throw new apiError.ValidationError('Thread Not Found', message.NOT_FOUND)
            }
        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));
        }
    }

    async getAllThreads(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let criteria = {
                customer_id: data.customer_id
            }


            let threads = await MessagingService.getAllThread(criteria)
            let modthreads = [];
            if (threads.length > 0) {
                for (let i = 0; i < threads.length; i++) {

                    let resp = Object.assign({}, threads[i].toJSON());
                    let getCustomer = await CustomerService.getCustomer({ _id: resp.customer_id })
                    let getFreelancer = await FreelancerService.getFreelancer({ _id: resp.freelancer_id })

                    resp.freelancer_name = getFreelancer.name
                    resp.freelancer_picture = getFreelancer.picture
                    resp.customer_name = getCustomer.name
                    resp.customer_picture = getCustomer.picture
                    modthreads.push(resp);
                }

                return res.status(200).send(ResponseService.success({ threads: modthreads }));
            } else {
                throw new apiError.ValidationError('Thread Not Found', message.NOT_FOUND)

            }

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));
        }
    }

}

module.exports = new MessagingController();
