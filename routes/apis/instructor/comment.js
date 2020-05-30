const express = require('express');
const router = express.Router();

const CommentController = require('../../../controllers/instructor/comment');

router.post('/addcomment', CommentController.addComment);
router.post('/getcomment', CommentController.getComment); 
router.post('/getallcomment', CommentController.getAllComment); 
router.post('/replycomment', CommentController.replyComment); 
router.get('/deletecomment', CommentController.deleteComment);  
router.post('/getrepliedcomment', CommentController.getRpliedComment);
router.get('/getunrepliedcomment', CommentController.getUnRpliedComment);

 
module.exports = router;