'use strict'

const express = require('express');
var compression = require('compression');
const bodyParse = require('body-parser');
const app = express();

const helmet = require('helmet');
const api = require('./routes/api.routes');
const xssFilter = require('x-xss-protection');

app.use(compression());

app.use(helmet());

app.use(xssFilter());
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
app.use('/', api);

module.exports = app;