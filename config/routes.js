const tubeController = require('../controllers/tubeController');

const routes = (app) => {
    app.get('/tubular', tubeController.getTubes);
    app.get('/stations', tubeController.getAllStations);
}
module.exports  = routes;