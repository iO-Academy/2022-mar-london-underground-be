const tubeController = require('../controllers/tubeController');

const routes = (app) => {
    app.get('/tubular', tubeController.getTubes);
    app.get('/stations', tubeController.getAllStations);
    app.post('/journeys', tubeController.getJourneys);
    // app.post('/journeys', tubeController.)
}
module.exports  = routes;