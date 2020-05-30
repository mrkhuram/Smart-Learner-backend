const express = require('express');
const router = express.Router();

const CommentController = require('../../../controllers/customer/comment');

router.post('/addcomment', CommentController.addComment); 
router.post('/getcomment', CommentController.getComment);
router.post('/getallcomments', CommentController.getAllComment);
router.post('/replycomment', CommentController.replyComment);

module.exports = router;