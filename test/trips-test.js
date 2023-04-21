import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips.js';
import Destinations from '../src/Destinations.js';
const dayjs = require('dayjs');

describe('Trips class tests', () => {
  let dataArray;
  let tripsRepo;
  let destinationsRepo;

  beforeEach(() => {
    dataArray = [
      {
        "id": 1,
        "userID": 44,
        "destinationID": 49,
        "travelers": 1,
        "date": "2022/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 4,
        "userID": 43,
        "destinationID": 14,
        "travelers": 2,
        "date": "2022/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 5,
        "userID": 42,
        "destinationID": 29,
        "travelers": 3,
        "date": "2022/04/30",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 6,
        "userID": 29,
        "destinationID": 35,
        "travelers": 3,
        "date": "2022/06/29",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 7,
        "userID": 37,
        "destinationID": 17,
        "travelers": 5,
        "date": "2022/5/28",
        "duration": 20,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 46,
        "userID": 44,
        "destinationID": 33,
        "travelers": 2,
        "date": "2020/08/24",
        "duration": 11,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 47,
        "userID": 28,
        "destinationID": 32,
        "travelers": 3,
        "date": "2019/12/10",
        "duration": 14,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 48,
        "userID": 44,
        "destinationID": 14,
        "travelers": 6,
        "date": "2021/02/10",
        "duration": 8,
        "status": "pending",
        "suggestedActivities": []
      }
    ];

    tripsRepo = new Trips(dataArray);

    destinationsRepo = new Destinations([
      {
        "id": 1,
        "destination": "Lima, Peru",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 400,
        "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "overview of city buildings with a clear sky"
      },
      {
        "id": 2,
        "destination": "Stockholm, Sweden",
        "estimatedLodgingCostPerDay": 100,
        "estimatedFlightCostPerPerson": 780,
        "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with boats on the water during the day time"
      },
      {
        "id": 25,
        "destination": "New York, New York",
        "estimatedLodgingCostPerDay": 175,
        "estimatedFlightCostPerPerson": 200,
        "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
      },
      {
        "id": 14,
        "destination": "Marrakesh, Morocco",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 830,
        "image": "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        "alt": "people buying oranges and other fruit from a street vendor"
      },
      {
        "id": 33,
        "destination": "Brussels, Belgium",
        "estimatedLodgingCostPerDay": 1000,
        "estimatedFlightCostPerPerson": 110,
        "image": "https://images.unsplash.com/photo-1559113202-c916b8e44373?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "brown concrete gate"
      },
      {
        "id": 49,
        "destination": "Castries, St Lucia",
        "estimatedLodgingCostPerDay": 650,
        "estimatedFlightCostPerPerson": 90,
        "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
        "alt": "aerial photography of rocky mountain under cloudy sky"
      }
    ]);
  });

  it('should be an instance of Trips class', () => {
    expect(tripsRepo).to.be.an.instanceOf(Trips)
  });

  it('should store an array of all trip objects', () => {
    expect(tripsRepo.allData).to.deep.equal(dataArray)
  });

  it('should find all trips for a given userID number and return them sorted newest to oldest', () => {
    expect(tripsRepo.findSortedTripsBy('userID', 44)).to.deep.equal([
      {
        "id": 1,
        "userID": 44,
        "destinationID": 49,
        "travelers": 1,
        "date": "2022/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 48,
        "userID": 44,
        "destinationID": 14,
        "travelers": 6,
        "date": "2021/02/10",
        "duration": 8,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 46,
        "userID": 44,
        "destinationID": 33,
        "travelers": 2,
        "date": "2020/08/24",
        "duration": 11,
        "status": "approved",
        "suggestedActivities": []
      }
    ])
  });

  it('should find all trips for a given status string and return them sorted newest to oldest', () => {
    expect(tripsRepo.findSortedTripsBy('status', 'approved')).to.deep.equal([
      {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 1,
        "userID": 44,
        "destinationID": 49,
        "travelers": 1,
        "date": "2022/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 6,
        "userID": 29,
        "destinationID": 35,
        "travelers": 3,
        "date": "2022/06/29",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 7,
        "userID": 37,
        "destinationID": 17,
        "travelers": 5,
        "date": "2022/5/28",
        "duration": 20,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 5,
        "userID": 42,
        "destinationID": 29,
        "travelers": 3,
        "date": "2022/04/30",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 4,
        "userID": 43,
        "destinationID": 14,
        "travelers": 2,
        "date": "2022/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 46,
        "userID": 44,
        "destinationID": 33,
        "travelers": 2,
        "date": "2020/08/24",
        "duration": 11,
        "status": "approved",
        "suggestedActivities": []
      }
    ])
  });

  it('should find all trips for a different status string and return them sorted newest to oldest', () => {
    expect(tripsRepo.findSortedTripsBy('status', 'pending')).to.deep.equal([
      {
        "id": 48,
        "userID": 44,
        "destinationID": 14,
        "travelers": 6,
        "date": "2021/02/10",
        "duration": 8,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 47,
        "userID": 28,
        "destinationID": 32,
        "travelers": 3,
        "date": "2019/12/10",
        "duration": 14,
        "status": "pending",
        "suggestedActivities": []
      }
    ])
  });

  it('should return an empty array if the first argument passed is not an exact match', () => {
    expect(tripsRepo.findSortedTripsBy('userId', 44)).to.be.empty
  });

  it('should return an empty array if the second argument passed is not an exact match', () => {
    expect(tripsRepo.findSortedTripsBy('userID', '44')).to.be.empty
  });

  it('should return an empty array if the second argument passed is not included in the data', () => {
    expect(tripsRepo.findSortedTripsBy('userID', 1)).to.be.empty
  });

  it('should calculate the total spent on past trips by a specific user', () => {
    expect(tripsRepo.calculateTotalCost(35, destinationsRepo)).to.equal(4565)
  });

  it('should calculate the total spent on past trips by a different user', () => {
    expect(tripsRepo.calculateTotalCost(44, destinationsRepo)).to.equal(24255)
  });

  it('should return undefined if the userID is not an exact match', () => {
    expect(tripsRepo.calculateTotalCost('35', destinationsRepo)).to.be.undefined
  });

  it('should return 0 if the userID is not included in the data', () => {
    expect(tripsRepo.calculateTotalCost(1, destinationsRepo)).to.equal(0)
  });

  it('should return 0 if the destination is not included in the data', () => {
    expect(tripsRepo.calculateTotalCost(28, destinationsRepo)).to.equal(0)
  });

  it('should calculate the total spent on past trips by all users', () => {
    expect(tripsRepo.calculateTotalCost(undefined, destinationsRepo)).to.equal(31416)
  });
})