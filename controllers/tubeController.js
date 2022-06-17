const tubeService = require('../services/tubeService');

const getTubes = (req, res) => {
    console.log('Controller: getTubes');
    tubeService.getTubes().then((allTubes) => res.json(allTubes));
}

const getAllStations = (req, res) => {
    console.log('Controller: getAllStations');
    tubeService.getAllStations().then((allStations) => res.json(allStations));
}

const getJourneys = (req, res) => {
    console.log('Controller: getJourneys');
    let stations = req.body;
    console.log(stations);
    tubeService.getJourneys(stations)
        .then((journeys) => {
                let lines = [];
                journeys.forEach(item => {
                    lines.push(item.line);
                })
                return lines;
            }
        )
        .then((lines) => res.json(lines));
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;
