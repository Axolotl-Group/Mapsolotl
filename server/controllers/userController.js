const User = require('../userModel');
const bcrypt = require('bcrypt');
const userController = {};

//createUser - create and save a new User into the database.
userController.createUser = async (req, res, next) => {
  try {
    // const newUser = await User.create({
    //   userName,
    //   password,
    // });
    const { userName, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(password, salt);
    const response = await User.create({ userName, password: hashedPW });
    const saveUser = await response.save();
    res.locals.userId = saveUser;
    // console.log('newuser: ', userName);
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
    console.log(req.body);
    const { userName, password } = req.body;
    console.log('req.body:', req.body);
    const user = await User.findOne({ userName });
    console.log('user:', userName);
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('a new log');
    console.log('user: ', userName);
    if (!user) {
      //redirect to signup if user doesn't exist
      res.redirect('/signup');
    } else if (!passwordMatch) {
      console.log('password incorrect');
      res.redirect('/signup');
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
//Oauth
userController.getToken = async ({ query }, response) => {
  const { code } = query;
  console.log('inside this.getToken, outside conditional');
  if (code) {
    console.log('inside condition in getToken');
    try {
      const tokenResponseData = await request(
        'https://discord.com/api/oauth2/token',
        {
          method: 'POST',
          body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://localhost:${port}`,
            scope: 'identify',
          }).toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const oauthData = await tokenResponseData.body.json();

      const userResult = await request('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });
      console.log(userResult);

      console.log(await userResult.body.json());
    } catch (error) {
      // NOTE: An unauthorized token will not throw an error
      // tokenResponseData.statusCode will be 401
      console.error(error);
    }
  }
  // return response.sendFile(path.join(__dirname, '../index.html'));
  return response.status(200).redirect('../index.html');
  // return response.status(200).redirect('../index.html');
};

module.exports = userController;
