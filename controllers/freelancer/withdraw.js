const FreelanceServices = require('../../services/FreelanceService');
const ServiceOrderServices = require('../../services/service_order');
const WidthdrawServices = require('../../services/withdraw');

const mongoose = require('mongoose');

const apiError = require('../../common/api-errors')
const message = require('../../common/messages')
const ResponseService = require('../../common/response');

class WithdrawController {

    async withdrawRequest(req, res) {
        try {

            let data = Object.assign({}, req.body)
            let amount = JSON.parse(data.amount)
            let totalEarnings = 0
            let totalWithdraws = 0
            let availableBalance = 0

            //Checking Total Sales
            let criteria = {
                freelancer_id: data.freelancer_id,
                status: 3
            }
            let getSoldServices = await ServiceOrderServices.getAllOrders(criteria);
            if (getSoldServices.length > 1) {
                for (let i = 0; i < getSoldServices.length; i++) {
                    totalEarnings += getSoldServices[i].price
                }
            } else if (getSoldServices.length == 1) {

                totalEarnings += getSoldServices[i].price

            } else {
                throw new apiError.ValidationError('Out of Balance', message.NOT_FOUND)
            }

            // Checking Previous withdraws
            let criteria2 = {
                withdraw_owner: data.freelancer_id,
                // status: 2
            }
            let checkWidthraws = await WidthdrawServices.previousWithdraws(criteria2);
            if (checkWidthraws.length > 1) {
                for (let i = 0; i < checkWidthraws.length; i++) {
                    totalWithdraws += checkWidthraws[i].amount
                }
            } else if (checkWidthraws.length == 1) {

                totalWithdraws += checkWidthraws[0].amount

            }

            availableBalance = totalEarnings - totalWithdraws

            if (availableBalance >= amount && availableBalance > 0) {
                let details = {
                    withdraw_owner: data.freelancer_id,
                    amount: amount,
                    bank_name: data.bank_name,
                    acc_tittle: data.acc_tittle,
                    acc_type: data.acc_type,
                    acc_number: data.acc_number
                }
                let requestWithdraw = await WidthdrawServices.withdrawRequest(details)
            } else {
                throw new apiError.ValidationError("You don't have enough balance", message.INVALID_REQUEST)
            }

            res.status(200).send(ResponseService.success({ resp: true }))

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e))

        }
    }

    async getWithdrawHistory(req, res) {
        try {
            let data = Object.assign({}, req.body)
            if (!data.freelancer_id) throw new apiError.ValidationError('Freelancer id is required', message.REQUIRED);
            let criteria = {
                withdraw_owner: data.freelancer_id
            }
            let getAllRequests = await WidthdrawServices.previousWithdraws(criteria);

            res.status(200).send(ResponseService.success({ withdrawHistory: getAllRequests }))

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e))

        }
    }

    async getSales(req, res) {
        try {
            let data = Object.assign({}, req.body)
            let totalEarnings = 0
            let totalWithdraws = 0
            let pendingWithdraws = 0


            //Checking Total Sales
            let criteria = {
                freelancer_id: data.freelancer_id,
                status: 3
            }
            let getSoldServices = await ServiceOrderServices.getAllOrders(criteria);
            if (getSoldServices.length > 1) {
                for (let i = 0; i < getSoldServices.length; i++) {
                    totalEarnings += getSoldServices[i].price
                }
            } else if (getSoldServices.length == 1) {

                totalEarnings += getSoldServices[0].price

            } else {
                throw new apiError.ValidationError('Out of Balance', message.NOT_FOUND)
            }

            // Checking Previous withdraws
            let criteria2 = {
                withdraw_owner: data.freelancer_id,
                status: 2
            }
            let checkWidthraws = await WidthdrawServices.previousWithdraws(criteria2);
            if (checkWidthraws.length > 1) {
                for (let i = 0; i < checkWidthraws.length; i++) {
                    totalWithdraws += checkWidthraws[i].amount
                }
            } else if (checkWidthraws.length == 1) {

                totalWithdraws += checkWidthraws[0].amount

            }
            //Check Pending Withdraws
            let criteria3 = {
                withdraw_owner: data.freelancer_id,
                status: 1
            }
            let checkPendingWidthraws = await WidthdrawServices.pendingWithdraws(criteria3);
            if (checkPendingWidthraws.length > 1) {
                for (let i = 0; i < checkPendingWidthraws.length; i++) {
                    pendingWithdraws += checkPendingWidthraws[i].amount
                }
            } else if (checkPendingWidthraws.length == 1) {

                pendingWithdraws += checkPendingWidthraws[0].amount

            }
            let withdraws = totalWithdraws + pendingWithdraws
            let availableBalance = totalEarnings - withdraws
            let resp = {
                totalSale: totalEarnings,
                availableBalance: availableBalance,
                pendingWithdraw: pendingWithdraws,
                receivedAmount: totalWithdraws
            }

            res.status(200).send(ResponseService.success({ balance: resp }))

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e))

        }
    }

}

module.exports = new WithdrawController();