const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    // sets the name of the DB that our collections are part of
    dbName: 'users',
  })
  .then(() => console.log('Connected to Database: users.'))
  .catch((err) => console.log(err));
