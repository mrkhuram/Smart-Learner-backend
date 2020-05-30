const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthService = require('../services/auth');
const AdminService = require('../services/admin');
const FreelancerService = require('../services/freelancer');
const InstituteService = require('../services/institute');
const InstructorService = require('../services/instructor');
const CustomerService = require('../services/customer');

const apiError = require('../common/api-errors');
const messages = require('../common/messages');
const ResponseService = require('../common/response');


passport.serializeUser(async (user, next) => {
    console.log(user)
    return next(null, user.email)
})
passport.deserializeUser(async (user, next) => {
    try {
        console.log(user.email)

        let user1 = await AdminService.getAdmin({ email: user.email });
        if (!user1) user1 = await FreelancerService.getFreelancer({ email: user.email })
        if (!user1) user1 = await InstituteService.getInstitute({ email: user.email })
        if (!user1) user1 = await InstructorService.getInstructor({ email: user.email })
        if (!user1) user1 = await CustomerService.getCustomer({ email: user.email })

        if (!user1) return next(null, null);
        if (user1) return next(null, user1.email);
    } catch (error) {
        next(error)
    }
})

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        let user1 = await AdminService.getAdmin({ email: username })
        if (!user1) user1 = await FreelancerService.getFreelancer({ email: username })
        if (!user1) user1 = await InstituteService.getInstitute({ email: username })
        if (!user1) user1 = await InstructorService.getInstructor({ email: username })
        if (!user1) user1 = await CustomerService.getCustomer({ email: username })



        if (user1) {
            let matchBcrypt = await bcrypt.compare(password, user1.password);
            if (!matchBcrypt) return done(null, false);
            return done(null, user1);
        }
        if (!user1) { return done(null, false); }
    } catch (e) {
        return done((e));

    }


}))

module.exports = passport;