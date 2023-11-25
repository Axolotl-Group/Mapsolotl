const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const userController = require('./controllers/userController');


// Body parser middleware for JSON data
  app.use(express.json());

  // Body parser middleware for URL-encoded data
  app.use(express.urlencoded({ extended: true }));
  

  // statically serve everything in the build folder on the route '/build'
  app.use("/build", express.static(path.join(__dirname, "../build")));

  // serve index.html on the route '/'
  app.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../index.html"));
  });
  
  app.post('/signup', userController.createUser, (req, res) => {
    res.sendStatus(201);
  });

  app.post('/login', userController.verifyUser, (req, res) => {
    res.sendStatus(200);
  });

  app.patch('/updatepw/:name',userController.updateUser,(req,res) => {
    res.sendStatus(201);
  })
  
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
module.exports = app;

