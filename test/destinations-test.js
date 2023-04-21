import chai from 'chai';
const expect = chai.expect;
import Destinations from '../src/Destinations.js';

describe('Destinations class tests', () => {
  let dataArray;
  let destinationsRepo;

  beforeEach(() => {
    dataArray = [
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
        "id": 3,
        "destination": "Sydney, Austrailia",
        "estimatedLodgingCostPerDay": 130,
        "estimatedFlightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
      },
      {
        "id": 4,
        "destination": "Cartagena, Colombia",
        "estimatedLodgingCostPerDay": 65,
        "estimatedFlightCostPerPerson": 350,
        "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "alt": "boats at a dock during the day time"
      },
      {
        "id": 5,
        "destination": "Madrid, Spain",
        "estimatedLodgingCostPerDay": 150,
        "estimatedFlightCostPerPerson": 650,
        "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with clear skys and a road in the day time"
      },
      {
        "id": 6,
        "destination": "Jakarta, Indonesia",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 890,
        "image": "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "lit up city at night"
      },
      {
        "id": 7,
        "destination": "Paris, France",
        "estimatedLodgingCostPerDay": 100,
        "estimatedFlightCostPerPerson": 395,
        "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
        "alt": "city during the day time with eiffel tower"
      },
      {
        "id": 8,
        "destination": "Tokyo, Japan",
        "estimatedLodgingCostPerDay": 125,
        "estimatedFlightCostPerPerson": 1000,
        "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
        "alt": "city with people walking in crosswalk and brightly lit shops at night"
      }
    ];

    destinationsRepo = new Destinations(dataArray);
  });

  it('should be an instance of Destinations class', () => {
    expect(destinationsRepo).to.be.an.instanceOf(Destinations)
  });

  it('should store an array of all destination objects', () => {
    expect(destinationsRepo.allDestinations).to.deep.equal(dataArray)
  });

  it('should find one destination\'s data based on an ID number', () => {
    expect(destinationsRepo.findById(4)).to.deep.equal({
      "id": 4,
      "destination": "Cartagena, Colombia",
      "estimatedLodgingCostPerDay": 65,
      "estimatedFlightCostPerPerson": 350,
      "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      "alt": "boats at a dock during the day time"
    })
  });

  it('should return undefined if the ID is not an exact match', () => {
    expect(destinationsRepo.findById('4')).to.be.undefined
  });

  it('should return undefined if the ID is not included in the data', () => {
    expect(destinationsRepo.findById(10)).to.be.undefined
  });

  it('should return a destination\'s name based on a given key string', () => {
    expect(destinationsRepo.findById(1).destination).to.equal('Lima, Peru')
  });

  it('should return a destination\'s lodging cost based on a given key string', () => {
    expect(destinationsRepo.findById(1).estimatedLodgingCostPerDay).to.equal(70)
  });

  it('should return a destination\'s flight cost based on a given key string', () => {
    expect(destinationsRepo.findById(2).estimatedFlightCostPerPerson).to.equal(780)
  });

  it('should return a destination\'s image src based on a given key string', () => {
    expect(destinationsRepo.findById(2).image).to.equal('https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')
  });

  it('should return a destination\'s image alt text based on a given key string', () => {
    expect(destinationsRepo.findById(5).alt).to.equal('city with clear skys and a road in the day time')
  });

  it('should return undefined if the key searched isn\'t an exact match', () => {
    expect(destinationsRepo.findById(5).altText).to.be.undefined;
  });

  it('should calculate the estimated cost for a future trip based on a number of days and number of travelers', () => {
    expect(destinationsRepo.calculateTripCost(8, 10, 2)).to.equal(3575)
  });

  it('should return a cost of 0 if the destination is not found', () => {
    expect(destinationsRepo.calculateTripCost(20, 10, 2)).to.equal(0)
  });
})