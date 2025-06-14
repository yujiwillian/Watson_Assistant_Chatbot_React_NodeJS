const router = require('express').Router();
const { checkToken, checkAssistant } = require('../../middlewares');
const assistant = require('./assistant');

router.use('/assistant', checkToken, checkAssistant, assistant);

module.exports = router;
