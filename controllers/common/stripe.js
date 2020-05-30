const stripe = require('stripe')('sk_test_0KziHudfqX3n3AoV3BSWBnw900IGCvE5yH');


const InstructorService = require('../../services/instructor');
const InstituteService = require('../../services/institute');
const TransactionService = require('../../services/transaction');




const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class PaymentController {
  async feepayment(req, res) {
    try {
      let request = Object.assign({}, req.body);
      let type = 0;
      if (!request.payer_id) throw new apiError.ValidationError('id', message.ID_REQUIRED)
      let getInstitute = await InstituteService.getInstitute({ _id: request.payer_id });
      if (getInstitute) if (getInstitute.id) type = 1;
      if (!getInstitute) {
        let getInstructor = await InstructorService.getInstructor({ _id: request.payer_id })
        if (getInstructor.id) type = 2;

        if (!getInstructor) throw new apiError.ValidationError('email', message.ID_INVALID);
      }



      stripe.customers.create({
        name: request.name,
        email: request.email,
        source: request.stripeToken //in web .stripeToken
      }).then(customer => stripe.charges.create({
        amount: request.amount * 100,
        currency: "usd",
        customer: customer.id
      })).then(async customer => {
        let details = {
          transaction_id: customer.balance_transaction,
          transaction_owner: request.payer_id,
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
        let details2 = {
          "fee.transaction_id": transaction.id,
          "fee.status": 2
        }
        let criteria2 = {
          _id: request.payer_id
        }
        if (type == 1) {

          let updateInstitute = await InstituteService.updateInstitute(criteria2, details2)
        } else if (type == 2) {
          let updateInstructor = await InstructorService.updateInstructor(criteria2, details2)

        }
        res.status(200).send(ResponseService.success({ customer: customer }))
      })
        .catch(err => res.status(200).send(ResponseService.failure(err)));

    } catch (e) {
      return res.status(200).send(ResponseService.failure(e));

    }
  }

}

module.exports = new PaymentController();