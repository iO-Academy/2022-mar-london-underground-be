const dbService = require('../services/dbService');

let tubes = null;
dbService.connectToDb().then((db) => tubes = db.collection('tubular'));

const getTubes = async () => {
    console.log(`Repository: getTubes`);
    return await tubes.find({}).toArray();     //{} not necessary - just different syntax
}

const getTubes = async () => {
    console.log(`Repository: getAllStations`);
    return await tubes.find({}).toArray();     //{} not necessary - just different syntax
}

module.exports.getTubes = getTubes;