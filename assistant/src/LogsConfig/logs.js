require('dotenv').config();

const pino = require('pino')({
    level: process.env.LOGGER_LEVEL ?? 'error',
});

module.exports = { pino };
