const tubeService = require('../services/tubeService');

const getTubes = (req, res) => {
    console.log('Controller: getTubes');
    tubeService.getTubes().then((allTubes) => res.json(allTubes));
}

const getAllStations = (req, res) => {
    console.log('Controller: getAllStations');
    tubeService.getAllStations().then((allStations) => res.json(allStations));
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;