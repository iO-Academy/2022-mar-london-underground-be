const tubeController = require('../controllers/tubeController');

const routes = (app) => {
    app.get('/stations', tubeController.getAllStations);
    app.post('/journeys', tubeController.getJourneys);
    app.all('*', tubeController.badRequest);
}

module.exports  = routes;
