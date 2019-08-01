export default {
    authHeaderNotPresent: () => {
        return {
            code: 400,
            message: util.format('Authorization header not present in the request')
        };
    },

    invalidAuthHeader: (authHeader) => {
        return {
            code: 400,
            message: util.format('Malformed authorization header: %s', authHeader)
        };
    },
    missingHeader: (header) => {
        return {
            code: 400,
            message: util.format('Missing header: ', header)
        };
    },
    missingRequestBody: (body) => {
        return {
            code: 400,
            message: util.format('Missing request body: ', body)
        };
    },
    invalidRequestBody: (body) => {
        return {
            code: 400,
            message: util.format('Invalid request body: %s',
                body)
        };
    },
    notAvailable: (item) => {
        return {
            code: 400,
            message: util.format("'%s' not available", item)
        };
    },
    alreadyExist: (item) => {
        return {
            code: 400,
            message: util.format("'%s' already exists", item)
        };
    },
    otpCreateFailed: (item) => {
        return {
            code: 400,
            message: util.format("unable to create code for '%s'", item)
        };
    },
    otpRequestExpired: () => {
        return {
            code: 400,
            message: util.format("otp request has been expired")
        };
    },
    

};