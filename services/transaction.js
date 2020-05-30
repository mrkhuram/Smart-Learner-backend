const mongoose = require('mongoose');

const Transaction = require('../models/transaction');



class TransactionService {

    addTransaction(details){
        return new Transaction(details).save();
    }

    getTransaction(criteria){
        return Transaction.findOne(criteria);
    }

    
    getTransactionByUsaer(criteria){
        return Transaction.find(criteria);
    }

    getAllTransactions(){
        return Transaction.find();
    }

}

module.exports = new TransactionService();