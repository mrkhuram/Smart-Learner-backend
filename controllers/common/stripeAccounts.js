
const stripe = require("stripe")('sk_test_0KziHudfqX3n3AoV3BSWBnw900IGCvE5yH');

const AccountServices = require('../../services/account');
const FreelancerServices = require('../../services/freelancer');
const Instituteervices = require('../../services/institute');
const InstructorServices = require('../../services/instructor');

const mongoose = require('mongoose');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class StripeController {


    async getAuthLink(req, res) {
        // const state = uuidv4();
        // req.session.state = state;
        const args = new URLSearchParams({
            // state,
            client_id: 'ca_HHeT1132xZUZ9iNWt6sG96aXsYvv72j5'
        });
        const url = `https://connect.stripe.com/express/oauth/authorize?${args.toString()}`;
        return res.send({ url });
    }

    async authorize(req, res) {
        try {
            const { code } = req.query;
            const data = Object.assign({}, req.body);
            if (!data.userId) throw new apiError.ValidationError('User id is required', message.ID_REQUIRED)
            let getFreelancer = await FreelancerServices.getFreelancer({ _id: mongoose.Types.ObjectId(data.userId) });
            if (!getFreelancer) {
                let getinstitute = await Instituteervices.getInstitute({ _id: mongoose.Types.ObjectId(data.userId) });
                if (!getinstitute) {
                    let getInstructor = await InstructorServices.getInstructor({ _id: mongoose.Types.ObjectId(data.userId) });
                    if (!getInstructor) throw new apiError.ValidationError('User is not found', message.NOT_FOUND);
                }
            }
            // Assert the state matches the state you provided in the OAuth link (optional).
            // if (req.session.state !== state) {
            //     return res
            //         .status(403)
            //         .json({ error: "Incorrect state parameter: " + state });
            // }

            // Send the authorization code to Stripe's API.
            stripe.oauth
                .token({
                    grant_type: "authorization_code",
                    code
                })
                .then(
                    response => {
                        var connected_account_id = response.stripe_user_id;
                        saveAccountId(connected_account_id);

                        return res.status(200).send(ResponseService.success({ resp: true }));

                    },
                    err => {
                        if (err.type === "StripeInvalidGrantError") {
                            return res
                                .status(400)
                                .json({ error: "Invalid authorization code: " + code });
                        } else {
                            return res.status(500).json({ error: "An unknown error occurred." });
                        }
                    }
                );
            // });

            const saveAccountId = id => {
                // Save the connected account ID from the response to your database.
                let details = {
                    user_id: data.userId,
                    account_id: id
                }
                let storeAccount = AccountServices.addAccount(details)
                console.log("Connected account ID: " + id);
            };

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));

        }
    }

}

module.exports = new StripeController();