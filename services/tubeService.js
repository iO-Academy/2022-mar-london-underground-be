const tubeRepository = require('../repositories/tubeRepository');

const getTubes = async () => {
    console.log(`Service: getTubes`);
    return await tubeRepository.getTubes();
}

const getAllStations = async () => {
    console.log(`Service: getAllStations`);
    return await tubeRepository.getAllStations();
}

const getJourneys = async (stations) => {
    console.log(`Service: getJourneys`);
    return await tubeRepository.getJourneys(stations);
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;