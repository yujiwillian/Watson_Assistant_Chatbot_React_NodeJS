const express = require('express');
const helmet = require('helmet');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(routes);

module.exports = app;
