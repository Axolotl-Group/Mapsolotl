const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
require('dotenv').config();

/**
 * require userModel in userController
 * const mongoose = require("mongoose");
 * require('dotenv').config();
 */
const SALT_WORK_FACTOR = 10; 
mongoose
  .connect(process.env.MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "users",
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));


// sets a schema for the 'user' collection
const userSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  
});

// userSchema.pre('save', function(){
//     if (!this.isModified('password')) return;
//     const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
//     const hashedPassword = bcrypt.hashSync(this.password, salt)
//     this.password = hashedPassword;
//   })
// creats a model for the 'user' collection that will be part of the export
const User = mongoose.model("user", userSchema);


// exports all the models in an object to be used in the controller
module.exports = User;

