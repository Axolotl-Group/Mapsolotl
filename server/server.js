const express = require('express');
const app = express();
const path = require('path');
const trailsController = require('./controllers/trailsController');

app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   // statically serve everything in the build folder on the route '/build'

// }
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/search', trailsController.getTrails, (req, res) =>
  res.status(200).json(res.locals.trails)
);

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

app.listen(3000);
