const { pino } = require('../../LogsConfig/logs');

const checkSession = (req, res, next) => {
    const { sessionid } = req.headers;
    if (!sessionid) {
        pino.error('Session is required at headers');
        return res
            .status(400)
            .send({ message: 'Session is required at headers' });
    }
    return next();
};

module.exports = checkSession;
