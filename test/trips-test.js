import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips.js';
import Destinations from '../src/Destinations.js';
import { tripsArray, destinationsMiniArray } from './test-data.js';

describe('Trips class tests', () => {
  let tripsRepo;
  let destinationsRepo;

  beforeEach(() => {
    tripsRepo = new Trips(tripsArray);
    destinationsRepo = new Destinations(destinationsMiniArray);
  });

  it('should be an instance of Trips class', () => {
    expect(tripsRepo).to.be.an.instanceOf(Trips)
  });

  it('should store an array of all trip objects', () => {
    expect(tripsRepo.allData).to.deep.equal(tripsArray)
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
    expect(tripsRepo.calcTotalCost(35, destinationsRepo)).to.equal(4565)
  });

  it('should calculate the total spent on past trips by a different user', () => {
    expect(tripsRepo.calcTotalCost(44, destinationsRepo)).to.equal(24255)
  });

  it('should return undefined if the userID is not an exact match', () => {
    expect(tripsRepo.calcTotalCost('35', destinationsRepo)).to.be.undefined
  });

  it('should return 0 if the userID is not included in the data', () => {
    expect(tripsRepo.calcTotalCost(1, destinationsRepo)).to.equal(0)
  });

  it('should return 0 if the destination is not included in the data', () => {
    expect(tripsRepo.calcTotalCost(28, destinationsRepo)).to.equal(0)
  });

  it('should calculate the total spent on past trips by all users', () => {
    expect(tripsRepo.calcTotalCost(undefined, destinationsRepo)).to.equal(31416)
  });
})