const Chapter = require('../models/chapter');

class ChapterService {

    getChapters(criteria) {
        return Chapter.find(criteria).lean()
    } 

    getChapter(criteria) {
        return Chapter.findOne(criteria);
    }
 
    addChapter(details) {
        return new Chapter(details).save();
    }  

    updateChapter(criteria, details) {
        return Chapter.findOneAndUpdate(criteria, details, { new: true });
    }

    deleteChapter(criteria) {
        return Chapter.deleteMany(criteria);
    }
}


module.exports = new ChapterService() ;