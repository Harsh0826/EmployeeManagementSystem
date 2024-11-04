const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  let mongoURI =
    process.env.DATABASEURL || require('./config.js').DATABASEURL;

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('DB connection successful');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
