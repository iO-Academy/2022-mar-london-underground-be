const tubeService = require('../services/tubeService');

const getAllStations = (req, res) => {
    console.log('Controller: getAllStations');
    tubeService.getAllStations().then((allStations) => res.json(allStations));
}

const getJourneys = (req, res) => {
    console.log('Controller: getJourneys');
    let start = req.body.selectedStartStation;
    let end = req.body.selectedEndStation;
    tubeService.getJourneys(start, end).then((journeys) => res.json(journeys));
}

const badRequest = (req, res) => {
    return res.status(500).json({
        code : 500,
        Message: "Unknown route",
    })
}

module.exports.badRequest = badRequest;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;
