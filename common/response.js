// Requiring response codes service
const ResponseCodeService = require('./response-codes');

class ResponseService {

    success (data = {})
    {
        console.table([{ data: data }]);

        return {
            success: true,
            code: 200,
            data: data,
            message: "Data Found"
        };
    }

    failure (e) 
    {
        // Console error 
        console.table([{ code: e.code, name: e.name, message: e.message }]);

        return {
            success: false,
            code: 200,
            // code: ResponseCodeService.getCode(e.code).code || 200,
            message: e.message ? e.message.replace(/\s+$/g, '.') : e.message,
            data: e.error || {}
            // error: e.error || e
        };
    }

}

module.exports = new ResponseService();