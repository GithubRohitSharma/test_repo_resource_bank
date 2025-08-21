const mongoose = require('mongoose');
const logger = require('../utils/logger');

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {})
  .then(() => console.log('Connection Successfull!'))
  .catch((err) => {
    console.log(err);
    logger.error(`Mongo connection error: ${err.message}`);
  });

module.exports = mongoose;


