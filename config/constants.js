const constants = {

    authSecretToken: 'smartLearners',

    status: { active: 1, inactive: 2, pending: 3},

    googleClientId: '',

    facebookAuth: {
        clientId: '',
        clientSecret: ''
    },

    otp: {

        username: 'Smart-Learners',
        password: 'pak12345',
        originator: '99095',

        authKey: '',
        expiry: 5,
        sender: 'DEMOMSG',
        countryCode: 92,// pakistan => 92
    },

    
    
    pagination: {
        pageNo: 1,
        perPage: 10
    },
}

module.exports = constants;