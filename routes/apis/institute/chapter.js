const express = require('express');
const router = express.Router();

const ChapterController = require('../../../controllers/institute/chapter');

const Upload = require('../../../common/multer');

router.post('/', Upload.any(), ChapterController.addChapter);
router.post('/update', Upload.any() , ChapterController.updateChapter);
router.post('/getone', ChapterController.getOneChapter);
router.post('/getmany', ChapterController.getChapters); 
router.post('/delete', ChapterController.deleteChapter);
router.get('/delete_topic', ChapterController.deleteTopic);  

  
module.exports = router; 
   