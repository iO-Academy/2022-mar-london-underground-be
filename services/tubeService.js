const tubeRepository = require('../repositories/tubeRepository');

const getTubes = async () => {
    console.log(`Service: getTubes`);
    return await tubeRepository.getTubes();
}

const getAllStations = async () => {
    console.log(`Service: getAllStations`);
    return await tubeRepository.getAllStations();
}

const getJourneys = async (start, end) => {
    console.log(`Service: getJourneys`);

    return await tubeRepository.getJourneys(start, end)
        .then((journeys) => {
            let lines = [];
            journeys.forEach(line => {
                let filteredStations = [];
                let journeyTime = 0;
                if (start > end) {
                    filteredStations = line.stations.filter(filtered => filtered.name <= start && filtered.name >= end);
                } else {
                    filteredStations = line.stations.filter(filtered => filtered.name >= start && filtered.name <= end);
                }
                journeyTime = filteredStations.reduce((sum, current) => sum + current.timeToPrev, 1);
                console.log(journeyTime);
                let stops = filteredStations.length -1;
                console.log('number of stops = ' + stops);
                let lineData = {"line": line.line, "stops": stops, "time": journeyTime}
                lines.push(lineData);

            })
            return lines;
        })
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;