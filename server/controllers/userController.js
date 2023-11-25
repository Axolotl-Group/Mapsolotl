const User = require("../userModel");

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  // User.collection.deleteMany({})
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err)
      return next(
        "Error in userController.getAllUsers: " + JSON.stringify(err)
      );
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};
/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  // write code here
  // console.log("req.body: ", req.body)
  const { userName, password } = req.body;
  User.create({
    userName,
    password,
  })
    .then((userDoc) => {
      res.locals.userId = userDoc;
      userDoc.save();
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
module.exports = userController;
