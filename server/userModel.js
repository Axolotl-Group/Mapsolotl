const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    // sets the name of the DB that our collections are part of
    dbName: 'users',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Database: users.'))
  .catch((err) => console.log(err));

// // sets a schema for the 'user' collection
const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// creats a model for the 'user' collection that will be part of the export
const User = mongoose.model('user', userSchema);

// // exports all the models in an object to be used in the controller
module.exports = User;
