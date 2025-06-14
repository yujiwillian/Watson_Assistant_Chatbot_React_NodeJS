const app = require('./app');

const { pino } = require('./LogsConfig/logs');

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    pino.info(`App is running on port, ${PORT}`);
    console.log('App is running on port', PORT);
});
