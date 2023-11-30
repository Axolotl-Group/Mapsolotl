const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/secret', userController.getAllUser, (req, res) =>
  res.status(200).send(res.locals.users)
);
router.post('/signup', userController.createUser, (req, res) =>
  res.status(201).send('User Create successfully')
);

router.post('/login', userController.verifyUser, (req, res) =>
  res.status(200).redirect('/')
);

router.patch('/updatepw/:name', userController.updateUser, (req, res) =>
  res.status(201).send('Password updated')
);

router.get('/login', userController.getToken, (req, res) => {
  console.log(res.body);
  return res.status(200).redirect('/');
});

module.exports = router;
