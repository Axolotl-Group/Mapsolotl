const express = require('express');

const trailsController = require('../controllers/trailsController');

const router = express.Router();

router.get('/trails', trailsController.getTrails, (req, res) =>
  res.status(200).json(res.locals.trails)
);

router.get('/info', trailsController.getTrailInfo, (req, res) =>
  res.status(200).json(res.locals.trailInfo)
);

router.get('/maps', trailsController.getTrailMaps, (req, res) =>
  res.status(200).json(res.locals.trailMaps)
);

module.exports = router;
