const express = require('express');
const app = express();
const path = require('path');

const { request } = require('undici');
const { clientId, clientSecret, port } = require('../config.json');

const apiRouter = require('./routes/api');
const reviewRouter = require('./routes/reviews');
const userRouter = require('./routes/user');

// Body parser middleware for JSON data
app.use(express.json());

// Body parser middleware for URL-encoded data
app.use(express.urlencoded({ extended: true }));

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../signup.html'));
});

app.get('/login', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../login.html'))
);

// app.use('/', (req, res, next) => async ({ query }, response) => {
//   const { code } = query;

//   if (code) {
//     try {
//       const tokenResponseData = await request(
//         'https://discord.com/api/oauth2/token',
//         {
//           method: 'POST',
//           body: new URLSearchParams({
//             client_id: clientId,
//             client_secret: clientSecret,
//             code,
//             grant_type: 'authorization_code',
//             redirect_uri: `http://localhost:${port}`,
//             scope: 'identify',
//           }).toString(),
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       const oauthData = await tokenResponseData.body.json();

//       const userResult = await request('https://discord.com/api/users/@me', {
//         headers: {
//           authorization: `${oauthData.token_type} ${oauthData.access_token}`,
//         },
//       });

//       console.log(await userResult.body.json());
//     } catch (error) {
//       // NOTE: An unauthorized token will not throw an error
//       // tokenResponseData.statusCode will be 401
//       console.error(error);
//     }
//   }
//   // return response.sendFile(path.join(__dirname, '../index.html'));
//   // return response.sendFile('index.html', { root: '.' });
//   return response.status(200).redirect('../index.html');
// });

app.use('/api/', apiRouter);
app.use('/reviews/', reviewRouter);
app.use('/users/', userRouter);

//Trails
/*app.get('/search', trailsController.getTrails, (req, res) =>
  res.status(200).json(res.locals.trails)
);
*/
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

//express middleware error handler

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// if (process.env.NODE_ENV === 'production') {
//   // statically serve everything in the build folder on the route '/build'
// }

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
module.exports = { app, server };
