const router = require('express').Router();

const v1 = require('./v1');

router.get('/', (req, res) => {
    res.send({ message: 'App is up and running' });
});

router.use('/api/v1', v1);

module.exports = router;
