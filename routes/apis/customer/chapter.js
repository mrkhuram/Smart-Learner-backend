const express = require('express');
const router = express.Router();

const ChapterController = require('../../../controllers/customer/chapter');

router.post('/getchapter', ChapterController.getChapter); 
router.post('/chapterprogress', ChapterController.chapterProgress); 
router.post('/getmanychapters', ChapterController.getChapters); 
router.post('/gettopics', ChapterController.getTopics);


module.exports = router ;