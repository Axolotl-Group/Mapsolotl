const fetch = require('node-fetch');

const trailsController = {};

trailsController.getTrails = async (req, res, next) => {
  const { lat, lon } = req.query;
  console.log('req.query is:', req.query);
  const url = `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lon}`;
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
    console.log('result type is ', typeof result);
    console.log('result is', result);
    res.locals.trails = result;
    return next();
  } catch (error) {
    console.error(error);
    return next({
      log: `trailsController.getTrails ${error} ERROR: trailsController error`,
      status: 500,
      message: { err: 'An error in trailsController middleware controller' },
    });
  }
};

module.exports = trailsController;
