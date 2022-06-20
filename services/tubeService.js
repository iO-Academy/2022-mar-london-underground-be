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
    let start = stations.selectedStartStation;
    let end = stations.selectedEndStation;

   return await tubeRepository.getJourneys(stations)
    .then((stations) => {
            let lines = [];
            stations.forEach(line => {
                let stations = line.stations.filter(filtered => filtered.name <= start && filtered.name >= end);
                let stops = stations.length -1;
                console.log('number of stops = ' + stops);
                let lineData = {"station name": line.line, "stops": stops}
                lines.push(lineData)

            })
            return lines;
        })
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;