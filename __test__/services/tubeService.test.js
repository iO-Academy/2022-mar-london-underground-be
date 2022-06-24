const calcTripPrice = require('../../services/tubeService').calcTripPrice;

describe('calcTripPrice', () => {
    it('given Embankment and Westminster return 469', () => {
        expect(calcTripPrice('Embankment', 'Westminster', {stations: [
                {
                    "code": "EMB",
                    "name": "Embankment",
                    "timeToPrev": 269,
                    "timeToNext": 201,
                    "zone": 1
                },
                {
                    "code": "WMS",
                    "name": "Westminster",
                    "timeToPrev": 356,
                    "timeToNext": 265,
                    "zone": 3
                },
            ]})).toBe(469);
    });
});