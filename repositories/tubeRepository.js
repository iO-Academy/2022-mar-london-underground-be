const dbService = require('../services/dbService');

let tubes = null;
dbService.connectToDb().then((db) => tubes = db.collection('lines'));

const getTubes = async () => {
    console.log(`Repository: getTubes`);
    return await tubes.find({}).toArray();
}

const getAllStations = async () => {
    console.log(`Repository: getAllStations`);
    return await tubes.distinct("stations.name");
}

const getJourneys = async (stations) => {
    let start = stations.selectedStartStation;
    let end = stations.selectedEndStation;
    console.log(`Repository: getJourneys`);
    return await tubes.find({$and: [{"stations.name": start}, {"stations.name" : end}]}).toArray();
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;

