const tubeRepository = require('../repositories/tubeRepository');

const getTubes = async () => {
    console.log(`Service: getTubes`);
    return await tubeRepository.getTubes();
}

const getAllStations = async () => {
    console.log(`Service: getAllStations`);
    return await tubeRepository.getAllStations()
        .then((stations) => {
            let stationArray = [];
            let codeArray = [];
            let joinedList = [];

            stations.forEach((station) => {
                    station._id.name.map(item => stationArray.push(item))
                    station._id.code.map(item => codeArray.push(item))

                })

            stationArray.forEach((station) => {
                station += ` (${codeArray[stationArray.indexOf(station)]})`
                if(!joinedList.includes(station)) {
                    joinedList.push(station);
                }
            })

            return joinedList.sort();

        })

        }

const getJourneys = async (start, end) => {
    console.log(`Service: getJourneys`);

    return await tubeRepository.getJourneys(start, end)
        .then((journeys) => {
            let lines = [];
            let stops;
            journeys.forEach(line => {
                let filteredStations = [];
                let journeyTime = 0;
                let price = 399;
                let diff = 0;

                let startZone = line.stations.filter(x => x.name === start)
                let endZone = line.stations.filter(y => y.name === end)

                if(startZone[0].zone > endZone[0].zone) {
                    diff = startZone[0].zone - endZone[0].zone;
                    price += 70 * diff;
                } else if (startZone[0].zone < endZone[0].zone) {
                    diff = endZone[0].zone - startZone[0].zone;
                    price += 35 * diff;
                }

                if (start > end) {
                    filteredStations = line.stations.filter(filtered => filtered.name <= start && filtered.name >= end);
                    filteredStations.reverse();
                    filteredStations[filteredStations.length - 1].timeToPrev = 0;
                    journeyTime = filteredStations.reduce((sum, current) => sum + current.timeToPrev, 0);
                    stops = filteredStations.reduce((stations, station) => {
                        let stopData = {"stop": station.name, "timeToNext": station.timeToPrev}
                        stations.push(stopData);
                        return stations;
                    }, []);

                } else {
                    filteredStations = line.stations.filter(filtered => filtered.name >= start && filtered.name <= end);
                    filteredStations[filteredStations.length - 1].timeToNext = 0;
                    journeyTime = filteredStations.reduce((sum, current) => sum + current.timeToNext, 0);
                    stops = filteredStations.reduce((stations, station) => {
                        let stopData = {"stop": station.name, "timeToNext": station.timeToNext}
                        stations.push(stopData);
                        return stations;
                    }, []);
                }

                let numStops = filteredStations.length - 1;
                let lineData = {"line": line.line, "stops": numStops, "time": journeyTime, "price": price, "stations": stops};

                lines.push(lineData);
            })
            return lines;
        })
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;
