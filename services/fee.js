const Fee =  require('../models/fee');


class FeeService {
    payfee(details){
        return new Fee(details).save();
    }
}



module.exports = new FeeService;