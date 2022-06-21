const tubeRepository = require('../repositories/tubeRepository');

const getTubes = async () => {
    console.log(`Service: getTubes`);
    return await tubeRepository.getTubes();
}

const getAllStations = async () => {
    console.log(`Service: getAllStations`);
    return await tubeRepository.getAllStations()
        .then((allStations) => {
            let stationList = allStations[0].name;
            let codeList = allStations[0].code;
            let finalList = [];

            stationList.forEach((station) => {
                station += ` (${codeList[stationList.indexOf(station)]})`
                finalList.push(station);
            })

            return finalList;
        });
}

const getJourneys = async (start, end) => {
    console.log(`Service: getJourneys`);

    return await tubeRepository.getJourneys(start, end)
        .then((journeys) => {
            let lines = [];
            journeys.forEach(line => {
                let filteredStations = [];
                if (start > end) {
                    filteredStations = line.stations.filter(filtered => filtered.name <= start && filtered.name >= end);
                } else {
                    filteredStations = line.stations.filter(filtered => filtered.name >= start && filtered.name <= end);
                }
                
                let stops = filteredStations.length -1;
                console.log('number of stops = ' + stops);
                let lineData = {"line": line.line, "stops": stops}
                lines.push(lineData);
            })
            return lines;
        })
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;