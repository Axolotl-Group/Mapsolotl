const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/secret', userController.getAllUser, (req, res) =>
  res.status(200).send(res.locals.users)
);
router.post('/signup', userController.createUser, (req, res) =>
  res.status(201).redirect('/')
);

router.post('/login', userController.verifyUser, (req, res) =>
  res.status(200).redirect('/')
);

router.patch('/updatepw/:name', userController.updateUser, (req, res) =>
  res.status(201).send('Password updated')
);
//updated middleware --> after getting Token and User Info from discord,
//invoke the createDiscordUser middleware

//note: will need to refactor to separate getting the token and getting the username to make it easier to
//track session
router.get(
  '/login',
  userController.getToken,
  userController.createDiscordUser,
  (req, res) => {
    //console.log(res.body);
    return res.status(200).redirect('/');
  }
);

module.exports = router;
