const { pino } = require('../../LogsConfig/logs');

const checkAssistant = (req, res, next) => {
    const { assistantid } = req.headers;
    if (!assistantid) {
        pino.error('Assistant id is required at headers');

        return res
            .status(400)
            .send({ message: 'Assistant id is required at headers' });
    }
    return next();
};

module.exports = checkAssistant;
