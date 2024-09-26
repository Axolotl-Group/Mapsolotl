const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    // sets the name of the DB that our collections are part of
    dbName: 'discordUsers',
  })
  .then(() => console.log('Connected to Database: discordUsers.'))
  .catch((err) => console.log(err));

// // sets a schema for the 'user' collection
const disc_UserSchema = new Schema({
  userName: { type: String, required: true, unique: true }, //discord Username
  discordId: { type: String, required: true }, //discord UserID
});

// creats a model for the 'user' collection that will be part of the export
const Disc_User = mongoose.model('disc_User', disc_UserSchema);

// // exports all the models in an object to be used in the controller
module.exports = Disc_User;
