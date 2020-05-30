const express = require('express');
const router = express.Router();

const CommentController = require('../../../controllers/institute/comment');

router.get('/addcomment', CommentController.addComment);
router.get('/getcomment', CommentController.getComment);
router.get('/getallcomment', CommentController.getAllComment);
router.get('/replycomment', CommentController.replyComment);
router.get('/deletecomment', CommentController.deleteComment);
router.get('/getrepliedcomment', CommentController.getRpliedComment);
router.get('/getunrepliedcomment', CommentController.getUnRpliedComment);

 
module.exports = router;