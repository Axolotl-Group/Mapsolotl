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

// // sets a schema for the 'user' collection
// VERY CAREFUL TESTING!!!
// Set username to not have to be unique, which WILL cause problems if we screw with it
// will resolve tomorrow
const userSchema = new Schema({
  userType: { type: String, required: true },
  userName: { type: String, required: false, unique: false },
  password: { type: String, required: false },
  userNameDisc: { type: String, required: false },
});

// creats a model for the 'user' collection that will be part of the export
const User = mongoose.model('user', userSchema);

// // exports all the models in an object to be used in the controller
module.exports = User;
