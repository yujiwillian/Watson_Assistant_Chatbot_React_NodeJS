const { loggerError } = require('../../LogsConfig/logs');

const checkToken = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        loggerError.error('Token is required at headers');
        return res
            .status(400)
            .send({ message: 'Token is required at headers' });
    }
    return next();
};

module.exports = checkToken;
