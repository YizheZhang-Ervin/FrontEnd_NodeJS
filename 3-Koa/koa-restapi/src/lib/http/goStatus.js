const statusCode = {
    OK: {
        code: 200,
        message: 'success',
        result: '',
    },
    TokenExpire: {
        code: 401,
        message: 'TokenExpire',
        result: '',
    },
    ReLogin: {
        code: 403,
        message: 'ReLogin',
        result: '',
    },
    AuthFailed: {
        code: 418,
        message: 'AuthFailed',
        result: '',
    },
    ServerError: {
        code: 500,
        message: 'ServerError',
        result: '',
    }
}

module.exports = {
    statusCode
}