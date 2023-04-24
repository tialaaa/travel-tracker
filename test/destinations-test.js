import chai from 'chai';
const expect = chai.expect;
import Destinations from '../src/Destinations.js';
import { destinationsArray } from './test-data.js';

describe('Destinations class tests', () => {
  let destinationsRepo;

  beforeEach(() => {
    destinationsRepo = new Destinations(destinationsArray);
  });

  it('should be an instance of Destinations class', () => {
    expect(destinationsRepo).to.be.an.instanceOf(Destinations)
  });

  it('should store an array of all destination objects', () => {
    expect(destinationsRepo.allData).to.deep.equal(destinationsArray)
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
    expect(destinationsRepo.calcTripEstimate(8, 10, 2)).to.equal(3575)
  });

  it('should return a cost of 0 if the destination is not found', () => {
    expect(destinationsRepo.calcTripEstimate(20, 10, 2)).to.equal(0)
  });
})