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

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;