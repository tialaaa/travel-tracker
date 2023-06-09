import chai from 'chai';
const expect = chai.expect;
import Travelers from '../src/Travelers.js';
import { travelersArray } from './test-data.js';

describe('Travelers class tests', () => {
  let travelerRepo;

  beforeEach(() => {
    travelerRepo = new Travelers(travelersArray);
  });
  
  it('should be an instance of Travelers class', () => {
    expect(travelerRepo).to.be.an.instanceOf(Travelers)
  });

  it('should store an array of all traveler objects', () => {
    expect(travelerRepo.allData).to.deep.equal(travelersArray)
  });

  it('should be able to find one user\'s data based on a userID number', () => {
    expect(travelerRepo.findById(4)).to.deep.equal({
      "id": 4,
      "name": "Leila Thebeaud",
      "travelerType": "photographer"
    })
  });

  it('should return undefined if the userID is not an exact match', () => {
    expect(travelerRepo.findById('4')).to.be.undefined
  });

  it('should return undefined if the userID is not included in the data set', () => {
    expect(travelerRepo.findById(20)).to.be.undefined
  });

  it('should store the found user object in a property', () => {
    travelerRepo.findById(1);

    expect(travelerRepo.currentUser).to.deep.equal({
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer"
    });
  });

  it('should have an undefined property before any user is successfully found', () => {
    expect(travelerRepo.currentUser).to.equal(undefined)
  });

  it('should access the current user\'s name based on a given key', () => {
    expect(travelerRepo.findById(1).name).to.equal('Ham Leadbeater');
  });

  it('should access the current user\'s traveler type based on a different key', () => {
    expect(travelerRepo.findById(2).travelerType).to.equal('thrill-seeker');
  });

  it('should return undefined user info if the search key isn\'t an exact match', () => {
    expect(travelerRepo.findById(1).type).to.be.undefined;
  });

  it('should return the current user\'s first name string', () => {
    travelerRepo.findById(4);

    expect(travelerRepo.printFirstName()).to.equal('Leila');
  });

  it('should return undefined first name before any user is successfully found', () => {
    expect(travelerRepo.printFirstName()).to.be.undefined;
  });
});