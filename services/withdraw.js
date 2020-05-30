const Withdraw = require('../models/withdraw');
const Course_Oder = require('../models/course_order');
const Service_Order = require('../models/service_order');




class WithdrawServices {

    withdrawRequest(details){
        return new Withdraw(details).save();
    }
    approveWithdraw(criteria, details){
        return Withdraw.findOneAndUpdate(criteria, details);
    }
    pendingWithdraws(criteria){
        return Withdraw.find(criteria);
    }
    previousWithdraws(criteria){
        return Withdraw.find(criteria);
    }

    // totalBalanceInstitute(criteria){
    //     return Course_Oder.find(criteria);
    // }
    // totalBalanceFreelancer(criteria){
    //     return Service_Order.find(criteria);
    // }
}


module.exports = new WithdrawServices();