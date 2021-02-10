const dotenv = require('dotenv')
dotenv.config();

const {
    MONGOURI,
    JWT_KEY,
    JWT_TTL
} = process.env;

const MONGODB_OPTIONS = { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true };
const morganMode = process.env.DEV ? 'dev' : 'tiny';

module.exports = {
    morganMode,
    MONGODB_OPTIONS,
    MONGOURI,
    JWT_KEY,
    JWT_TTL
};