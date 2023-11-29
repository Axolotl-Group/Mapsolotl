const User = require('../userModel');
const bcrypt = require('bcrypt');
const userController = {};

//createUser - create and save a new User into the database.
userController.createUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(password, salt);
    const response = await User.create({ userName, password: hashedPW });
    const saveUser = await response.save();
    res.locals.userId = saveUser;
    console.log('newuser: ', saveUser);
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught in userController.createUser: ${err} `,
      status: 400,
      message: { err: 'error occured while creating user' },
    });
  }
};

// /**
//  * verifyUser - Obtain username and password from the request body, locate
//  * the appropriate user in the database, and then authenticate the submitted password
//  * against the password stored in the database.
//  */
userController.verifyUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log('user: ', user);
    if (!user) {
      //redirect to signup if user doesn't exist
      res.redirect('/signup');
    } else if (!passwordMatch) {
      console.log('password incorrect');
      res.redirect('/login');
    } else {
      console.log('Login successfully');
      return next();
    }
  } catch (err) {
    return next({
      log: `Express error handler caught in userController.verifyUser: ${err}`,
      status: 400,
      message: { err: 'error occured while verifying user' },
    });
  }
};

//update user's password
userController.updateUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(password, salt);
    const response = await User.findOneAndUpdate(
      { userName: req.params.name },
      { password: hashedPW },
      { new: true }
    );
    console.log('response for update user password', response);
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught in userController.updateUser: ${err}`,
      status: 400,
      message: { err: 'error occured while updating password' },
    });
  }
};
// getAllUsers - retrieve all users from the database
userController.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.locals.users = users;
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught in userController.getAllUser: ${err} `,
      status: 400,
      message: { err: 'error occured while getting all user' },
    });
  }
};
module.exports = userController;
