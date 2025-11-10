const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    logger.error('MONGO_URI missing in environment');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, { autoIndex: true });
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection error', err);
    process.exit(1);
  }
};
