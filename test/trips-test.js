import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips.js';

describe('Trips class tests', () => {
  let dataArray;
  let tripsRepo;

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
  });

  it('should be an instance of Trips class', () => {
    expect(tripsRepo).to.be.an.instanceOf(Trips)
  });

  it('should store an array of all trip objects', () => {
    expect(tripsRepo.allTrips).to.deep.equal(dataArray)
  });

  it('should find all trips for a given userID number', () => {
    expect(tripsRepo.findTripsBy('userID', 44)).to.deep.equal([
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
        "id": 48,
        "userID": 44,
        "destinationID": 14,
        "travelers": 6,
        "date": "2021/02/10",
        "duration": 8,
        "status": "pending",
        "suggestedActivities": []
      }
    ])
  });

  it('should find all trips for a given status string', () => {
    expect(tripsRepo.findTripsBy('status', 'approved')).to.deep.equal([
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
      }
    ])
  });

  it('should find all trips for a different status string', () => {
    expect(tripsRepo.findTripsBy('status', 'pending')).to.deep.equal([
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
    ])
  });

  it('should return an empty array if the first argument passed is not an exact match', () => {
    expect(tripsRepo.findTripsBy('userId', 44)).to.be.empty
  });

  it('should return an empty array if the second argument passed is not an exact match', () => {
    expect(tripsRepo.findTripsBy('userID', '44')).to.be.empty
  });

  it('should return an empty array if the second argument passed is not included in the data', () => {
    expect(tripsRepo.findTripsBy('userID', 1)).to.be.empty
  });

  // it('should calculate the total spent on past trips by a specific user', () => {
    
  // });

  // it('should calculate the total spent on past trips by a all users', () => {
    
  // });

  // it('should ', () => {
    
  // });

    // it('should ', () => {
    
  // });
})