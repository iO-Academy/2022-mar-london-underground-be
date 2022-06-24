const dbService = require('../services/dbService');

let tubes = null;
dbService.connectToDb().then((db) => tubes = db.collection('lines'));

const getAllStations = async () => {
    return await tubes.aggregate([
        {$group: {"_id": {name: "$stations.name", code : "$stations.code"}}}
    ]).toArray();
}

const getJourneys = async (start, end) => {
    return await tubes.find({$and: [{"stations.name": start}, {"stations.name" : end}]}).toArray();
}

module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;

