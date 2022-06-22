const tubeRepository = require('../repositories/tubeRepository');

const getTubes = async () => {
    console.log(`Service: getTubes`);
    return await tubeRepository.getTubes();
}

const getAllStations = async () => {
    console.log(`Service: getAllStations`);
    return await tubeRepository.getAllStations()
        .then((stations) => {
            let stationArrays = stations[0].name;
            let codeArrays = stations[0].code;
            let stationList = [];
            let sortedStationList = [];
            let codeList = [];
            let sortedCodeList = [];
            let finalList = [];

            stationArrays.forEach((line) => {
                line.forEach((station) => {
                    if (!stationList.includes(station)) {
                        stationList.push(station);
                    }
                })
            })
            sortedStationList = stationList.sort();

            codeArrays.forEach((line) => {
                line.forEach((station) => {
                    if (!codeList.includes(station)) {
                        codeList.push(station);
                    }
                })
            })
            sortedCodeList = codeList.sort();

            sortedStationList.forEach((station) => {
                station += ` (${sortedCodeList[sortedStationList.indexOf(station)]})`
                finalList.push(station);
            })

            return finalList;

        });

}

const getJourneys = async (start, end) => {
    console.log(`Service: getJourneys`);

    return await tubeRepository.getJourneys(start, end)
        .then((journeys) => {
            let startArray = [];
            let endArray = [];
            let singleJourneyArray = [];
            let changeData = [];
            let filteredData = [];

            journeys.forEach((journey => {
                if (journey.stations.some(i => i.name === start)) {
                    startArray.push(journey)
                }
                if (journey.stations.some(i => i.name === end)) {
                    endArray.push(journey)
                }
                if (journey.stations.some(i => i.name === start) && journey.stations.some(i => i.name === end)) {
                    singleJourneyArray.push(journey);
                    // console.log(journey.line)
                }
            }));
            // console.log(endArray);

            startArray.forEach(item => {
                if (!singleJourneyArray.includes(item)) {
                let lineArray = item.stations.map(station => station.name);
                let name = item.line;
                lineArray.forEach(stop => {
                    for (let x = 0; x < endArray.length; x++ ) {
                        let tempArray = [];
                    if (endArray[x].stations.some(i => i.name === stop)) {
                        tempArray.push([name, endArray[x].line, stop]);
                    }
                    if (tempArray.length !== 0) {
                        changeData.push(tempArray);
                    }
                }})}
                // console.log(lineArray);
            })
            filteredData = changeData.filter((change => {
                if (!filteredData.includes(change[0]) )
                    return change;

            }))
            return changeData;
        });


    // let lines = [];
    // journeys.forEach(line => {
    //     let filteredStations = [];
    //     let journeyTime = 0;
    //     if (start > end) {
    //         filteredStations = line.stations.filter(filtered => filtered.name <= start && filtered.name >= end);
    //         filteredStations.reverse();
    //         filteredStations[filteredStations.length - 1].timeToPrev = 0;
    //         journeyTime = filteredStations.reduce((sum, current) => sum + current.timeToPrev, 0);
    //         stops = filteredStations.reduce((stations, station) => {
    //             let stopData = {"stop": station.name, "timeToNext": station.timeToPrev}
    //             stations.push(stopData);
    //             return stations;
    //         }, []);
    //
    //     } else {
    //         filteredStations = line.stations.filter(filtered => filtered.name >= start && filtered.name <= end);
    //         filteredStations[filteredStations.length - 1].timeToNext = 0;
    //         journeyTime = filteredStations.reduce((sum, current) => sum + current.timeToNext, 0);
    //         stops = filteredStations.reduce((stations, station) => {
    //             let stopData = {"stop": station.name, "timeToNext": station.timeToNext}
    //             stations.push(stopData);
    //             return stations;
    //         }, []);
    //     }
    //
    //     let numStops = filteredStations.length -1;
    //     let lineData = {"line": line.line, "stops": numStops, "time": journeyTime, "stations": stops};
    //     lines.push(lineData);
    // })
    //
    //     return lines;
}

module.exports.getTubes = getTubes;
module.exports.getAllStations = getAllStations;
module.exports.getJourneys = getJourneys;