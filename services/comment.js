const Comment = require('../models/comment');


class CommentService {
    addComment(details){ 
        return new Comment(details).save();   
    }
    replyComment(criteria, details){
        return Comment.findOneAndUpdate(criteria, details, {new: true});
    }
    getOneComment(criteria){
        return Comment.findOne(criteria);
    }
    getAllcomment(criteria){
        return Comment.find(criteria)
    }
    deleteComment(criteria){
        return Comment.findOneAndDelete(criteria);
    } 
    getReplied(criteria){
        return Comment.countDocuments(criteria);
    }
    getUnReplied(criteria){
        return Comment.countDocuments(criteria);
    }
};

module.exports = new CommentService();