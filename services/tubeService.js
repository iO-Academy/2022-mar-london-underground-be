const tubeRepository = require('../repositories/tubeRepository');

const getAllStations = async () => {
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
                if (!joinedList.includes(station)) {
                    joinedList.push(station);
                }
            })

            return joinedList.sort();
        })
    }

const getJourneys = async (start, end) => {

    return await tubeRepository.getJourneys(start, end)
        .then((journeys) => {
            let lines = [];
            let stops;
            journeys.forEach(line => {
                let filteredStations = [];
                let journeyTime = 0;
                let time = '';

                if (start > end) {
                    filteredStations = line.stations.filter(filtered => filtered.name <= start && filtered.name >= end);
                    time = 'timeToPrev';

                    filteredStations.reverse();
                    journeyTime = calcTime(filteredStations, time);
                } else {
                    filteredStations = line.stations.filter(filtered => filtered.name >= start && filtered.name <= end);
                    time = 'timeToNext';

                    journeyTime = calcTime(filteredStations, time)
                    stops = showStop(filteredStations, time);
                }

                let numStops = filteredStations.length - 1;
                let lineData = {"line": line.line,
                                 "stops": numStops,
                                 "time": journeyTime,
                                 "price": calcTripPrice(start, end, line),
                                 "stations": stops};
                lines.push(lineData);
            })
            return lines;
        })
}

function calcTime (filteredStations, time) {
    return journeyTime = filteredStations.reduce((sum, current) => sum + current[time], 0);
}

function showStop (filteredStations, time) {
    filteredStations[filteredStations.length - 1][time] = 0;
    return filteredStations.reduce((stations, station) => {
        let stopData = {"stop": station.name, "timeToNext": station[time]}
        stations.push(stopData);
        return stations;
    }, []);
}

function calcTripPrice (start, end, line) {

    let startZone = line.stations.filter(x => x.name === start);
    let endZone = line.stations.filter(y => y.name === end);
    const ticketPrice = 399;

    if (startZone[0].zone > endZone[0].zone) {
        return ticketPrice + 70 * (startZone[0].zone - endZone[0].zone);
    } else if (startZone[0].zone < endZone[0].zone) {
        return ticketPrice + 35 * (endZone[0].zone - startZone[0].zone);
    } else {
        return ticketPrice
    }
}

module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;
module.exports.calcTripPrice = calcTripPrice;
