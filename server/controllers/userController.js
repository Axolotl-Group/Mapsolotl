const User = require('../userModel');
const bcrypt = require('bcrypt');

//have to import so that the request method in getToken works
const { request } = require('undici');
//import constants from config.json file (swapped to jake's client id & client secret before running should still work so long as config is set up)
require('dotenv').config();
const { clientId, clientSecret, port } = require('../../config.json');

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

//pulls the authorization code that Discord's OAuth passes back
//from URL. (query) => code
//then pings the /api/oauth2/token endpoint at discord with a post request
// w/the client id and secret along w/auth code
// this should return the specific access token to
// find the user data
// once we have the access token,
// do a request to api/users/@me with that token

// 1. User goes to the Discord page.
// 2. Discord redirects back to our /users/login endpoint (not just /login!). URL being sent back includes a /code?<string that is the discord auth code> chunk
// 3. user router sees a get request at the /login endpoint.
// 4. userController.getToken is invoked by the router.
// 5. getToken parses the authentication code, pulling it from the URL.
// 6. if a code is present in the URL, send a request to Discord's token endpoint.
// 7. if the code is correct (ie, no one messed w/it in transit), the auth token endpoint responds with an auth token. This still isn't the user information, just a token to get it.
// 8. Token is then passed as the authorization in the header of a request to Discords (different) /users/@me endpoint.
// 9. If the auth token is valid, the /users/@me endpoint responds with the user information we want.
userController.getToken = async ({ query }, response) => {
  const { code } = query;
  console.log('inside this.getToken, outside conditional');
  if (code) {
    console.log('inside condition in getToken');
    console.log('client secret', clientSecret);
    try {
      console.log('trying to request token');
      const tokenResponseData = await request(
        'https://discord.com/api/oauth2/token',
        {
          method: 'POST',
          body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://localhost:${port}/users/login`, //we still want this to ping back to the users/login page (eg, to this controller)
            scope: 'identify',
          }).toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const oauthData = await tokenResponseData.body.json();
      console.log(
        `token type: ${oauthData.token_type}, token value: ${oauthData.access_token}`
      );

      const userResult = await request('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });
      // NOTE: An unauthorized token will not throw an error
      // tokenResponseData.statusCode will be 401
      //console.log(userResult);

      console.log('Retrieved user data:', await userResult.body.json());
    } catch (error) {
      console.error(error);
    }
  }
  // return response.sendFile(path.join(__dirname, '../index.html'));
  return response.sendFile('login.html', { root: '.' });
  // return response.status(200).redirect('../index.html');
};

module.exports = userController;
