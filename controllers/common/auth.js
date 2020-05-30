let passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path').resolve;
const config = require(path('config/constants'));
const rp = require('request-promise');

const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const AuthService = require('../../services/auth');
const ResponseService = require('../../common/response');
// const googleAuth = require('../../common/google-auth');

class AuthController {

    async login(req, res, next) {

        try {
            let request = Object.assign({}, req.body);

            const type = this.getUserType(req.baseUrl); 

            // If no username provided, Throw error.
            if (!request.email) throw new apiError.ValidationError('username', messages.USERNAME_REQUIRED);

            request.email = request.email.toLowerCase();

            let user;
            // If no password provided, Throw unauthorized
            if (!request.password) throw new apiError.ValidationError('password', messages.PASSWORD_REQUIRED);


            let contact = request.email;

            if (contact.length >= 10) {

                contact = contact.slice(-10);
                contact = new RegExp(contact, 'i')

                user = await AuthService.getUser({ 'email': contact }, type);
            }

            if (!user) user = await AuthService.getUser({ 'email': request.email }, type);
            if (!user) throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID)

            // Get Passport Auth and return with response
            passport.authenticate('local', {
                failureRedirect: '/login',
                successRedirect: '/profile'
            }, function (err, resp) {
                if (resp) {
                    req.login(resp, () => {
                        // Remove password from response
                        resp.password = null;
                        let response = {
                            resp
                        };
                        // res.send(req.session)
                        return res.status(200).send(ResponseService.success(response));
                    });

                } else {
                    try {

                        throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID)
                    } catch (e) {
                        return res.status(e.code || 500).send(ResponseService.failure(e));
                    }

                }
            })(req, res, next);

        } catch (e) {
            return res.status(e.code || 500).send(ResponseService.failure(e));
        }
    }

    async register(req, res) { 

        try { 
            var data = Object.assign({}, req.body);
            const type = this.getUserType(req.baseUrl)
 
            // if (!data.contact_number) throw new apiError.ValidationError('contact_number', messages.CONTACT_REQUIRED);
            if (!data.email) throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);

            data.email = data.email.toLowerCase();
            var salt = await bcrypt.genSaltSync(10);
            var hash = await bcrypt.hashSync(data.password, salt);

            if (!hash) throw errorHandler.InternalServerError();

            data.password = hash;

            let user = await AuthService.getUser({ email: data.email }, type);
            if (user) {
                if (user.status == 3) await AuthService.deleteUser({ email: data.email }, type);
                else  throw new apiError.ValidationError('email', messages.EMAIL_ALREADY_EXIST);
            }



            var userData = await AuthService.createUser(data, type);
  
            let response = {
                userData
            };

            return res.status(200).send(ResponseService.success(response));

        } catch (err) {
            return res.status(err.status || 200).send(ResponseService.failure(err));
        }
    }



    async googleLogin(req, res) {

        try {

            let request = Object.assign({}, req.body);
            const type = this.getUserType(req.baseUrl);

            if (!request.id_token) throw new apiError.ValidationError('id_token', messages.AUTHENTICATION_TOKEN_REQUIRED);

            let payload = await googleAuth.verify(request.id_token);

            let userObj = {

                email: payload.email,
                full_name: payload.name,
                gmail_id: payload.sub,
                picture: payload.picture,
                status: config.status.active
            }

            //fcm_token
            if (request.fcm_token) {
                userObj.fcm_token = request.fcm_token;
            }

            let user = await AuthService.getUser({ email: userObj.email }, type)

            if (!user) {
                user = await AuthService.getUser({ gmail_id: payload.sub }, type);
                if (!user) {
                    user = await AuthService.createUser(userObj, type)

                } else {
                    user = await AuthService.updateUser(userObj, { gmail_id: payload.sub }, type);
                }
            } else {
                user = await AuthService.updateUser(userObj, { email: userObj.email }, type);
            }

            let token = await this.getJwtAuthToken(user);

            let response = {
                token,
                user
            };

            return res.status(200).send(ResponseService.success(response));

        } catch (e) {
            // console.log(e.code)
            return res.status(500).send(ResponseService.failure(e));
        }


    }

    async facebookLogin(req, res) {

        try {

            let request = Object.assign({}, req.body);
            const type = this.getUserType(req.baseUrl);

            if (!request.access_token) throw new apiError.ValidationError('access_token', messages.AUTHENTICATION_TOKEN_REQUIRED);

            if (!request.user_id) throw new apiError.ValidationError('user_id', messages.USER_ID_REQUIRED);

            const userFieldSet = 'id, name, about, email, picture';


            var options = {
                method: 'GET',
                uri: 'https://gph.facebook.com/' + request.user_id,
                qs: {
                    fields: userFieldSet,
                    access_token: request.access_token,
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true

            }

            let data = await rp(options);

            let userObj = {
                email: data.email,
                full_name: data.name,
                facebook_id: data.id,
                picture: data.picture.data.url,
                status: config.status.active
            }

            //fcm_token
            if (request.fcm_token) {
                userObj.fcm_token = request.fcm_token;
            }

            let user = await AuthService.getUser({ email: userObj.email }, type)

            if (!user) {
                user = await AuthService.getUser({ facebook_id: data.id }, type);
                if (!user) {
                    user = await AuthService.createUser(userObj, type)

                } else {
                    user = await AuthService.updateUser(userObj, { facebook_id: data.id }, type);
                }
            } else {
                user = await AuthService.updateUser(userObj, { email: userObj.email }, type);
            }

            let token = await this.getJwtAuthToken(user);

            let response = {
                token,
                user
            };

            return res.status(200).send(ResponseService.success(response));

        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }


    async logout(req, res) {

        try {

            const user_id = req._userInfo._user_id;
            const type = this.getUserType(req.baseUrl);

            let user = await AuthService.getUser({ _id: user_id }, type);

            if (!user) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID)

            let updatedUser = await AuthService.updateUser({ is_logout: true, $unset: { auth_token: 1 } }, { _id: user_id }, type)
            if (!updatedUser) throw new apiError.InternalServerError();

            res.send(ResponseService.success({ user: updatedUser }));


        } catch (e) {
            return res.status(e.code || 500).send(ResponseService.failure(e));
        }
    }

    // async loadProfile(req, res) {

    //     try {

    //         res.send(ResponseService.success({ user: req.user }));


    //     } catch (e) {
    //         return res.status(e.code || 500).send(ResponseService.failure(e));
    //     }
    // }

    getUserType(url) {
        let type = url.split('/')[2];

        switch (type) {
            case 'admin':
                return 1;
            case 'freelancer':
                return 2;
            case 'instructor':
                return 3;
            case 'institute':
                return 4;
            case 'customer':
                return 5
            default:
                return 0;
        }
    }
}

module.exports = new AuthController;