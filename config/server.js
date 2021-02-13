const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('../src/app/routes');
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');


const app = new express();

dotenv.config();

const {
    morganMode,
    MONGODB_OPTIONS,
    MONGOURI
} = require('./config');

mongoose.connect(MONGOURI, MONGODB_OPTIONS);
const conn = mongoose.connection;
conn.once('open', () => { console.log('Mongo Atlas Connected'); });
conn.on('error', (err) => { console.log('Mongo Atlas connection error: ', err); });

const swaggerDocument = YAML.load(`${__dirname}/swagger/v1.yml`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(morganMode));
app.use(cors());
app.use('/api', routes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;