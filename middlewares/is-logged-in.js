const path = require('path').resolve;

module.exports = async (req, res, next) => {
    if(!req.user){
        req.flash("error", "Must be signed in first to access this page.");
        res.redirect("/login");
    } else {
        console.log('Authenticated....')
        return next();
    }
  }