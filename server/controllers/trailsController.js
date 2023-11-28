const fetch = require('node-fetch');

const trailsController = {};

trailsController.getTrails = async (req, res, next) => {
  const { lat, lon, radius } = req.query;
  // console.log('req.query is:', req.query);
  const url = `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lon}&radius=${radius}`;
  //const url = `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=%3C${lat}%3E&lon=%3C${lon}%3E`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '75cd943faamsh354011c91bf6cfdp1bc1eajsn72a7b1b91267',
      'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.locals.trails = result;
    return next();
  } catch (error) {
    console.error(error);
    return next({
      log: `trailsController.getTrails ${error} ERROR: trailsController.getTrails error`,
      status: 500,
      message: {
        err: 'An error in trailsController.getTrails middleware controller',
      },
    });
  }
};

trailsController.getTrailInfo = async (req, res, next) => {
  const { id } = req.query;
  console.log('id is', id);
  const url = `https://trailapi-trailapi.p.rapidapi.com/trails/${id.toString()}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '75cd943faamsh354011c91bf6cfdp1bc1eajsn72a7b1b91267',
      'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.locals.trailInfo = result;
    return next();
  } catch (error) {
    return next({
      log: `trailsController.getTrailInfo ${error} ERROR: trailsController.getTrailInfo error`,
      status: 500,
      message: {
        err: 'An error in trailsController.getTrailInfo middleware controller',
      },
    });
  }
};

trailsController.getTrailMaps = async (req, res, next) => {
  const { id } = req.query;
  const url = `https://trailapi-trailapi.p.rapidapi.com/trails/${id}/maps/`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '75cd943faamsh354011c91bf6cfdp1bc1eajsn72a7b1b91267',
      'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.locals.trailMaps = result;
    return next();
  } catch (error) {
    return next({
      log: `trailsController.getTrailInfo ${error} ERROR: trailsController.getTrailInfo error`,
      status: 500,
      message: {
        err: 'An error in trailsController.getTrailInfo middleware controller',
      },
    });
  }
};
module.exports = trailsController;
