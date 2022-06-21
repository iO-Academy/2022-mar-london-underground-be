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
            let stop;
            journeys.forEach(line => {
                let filteredStations = [];
                let journeyTime = 0;
                if (start > end) {
                    filteredStations = line.stations.filter(filtered => filtered.name <= start && filtered.name >= end);
                    filteredStations[filteredStations.length - 1].timeToPrev = 0;  //6478/4853 before reduce
                    journeyTime = filteredStations.reduce((sum, current) => sum + current.timeToPrev, 0);
                    stops = filteredStations.reduce((stations, station) => {
                        let stopData = {"stop": station.name, "timeToNext": station.timeToPrev}
                        stations.push(stopData);
                        return stations;
                    }, []);

                } else {
                    filteredStations = line.stations.filter(filtered => filtered.name >= start && filtered.name <= end);
                    filteredStations[filteredStations.length - 1].timeToNext = 0; //6673/4997 before reduce
                    journeyTime = filteredStations.reduce((sum, current) => sum + current.timeToNext, 0);
                    stops = filteredStations.reduce((stations, station) => {
                        let stopData = {"stop": station.name, "timeToNext": station.timeToNext}
                        stations.push(stopData);
                        return stations;
                    }, []);
                }

                console.log(stops);
                console.log(journeyTime);
                let numStops = filteredStations.length -1;

                // console.log(stops);
                console.log('number of stops = ' + numStops);
                let lineData = {"line": line.line, "stops": numStops, "time": journeyTime,}
                lines.push(lineData);
            })
            return lines;
        })
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;