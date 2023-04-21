class Destinations {
  constructor(arrayOfDestinations) {
    this.allData = arrayOfDestinations
  };

  findById(destinationID) {
    return this.allData.find(place => place.id === destinationID);
  };

  calculateTripCost(destinationID, numDays, numTravelers) {
    let currentDestination = this.allData.find(place => place.id === destinationID);
    
    if (!currentDestination) {
      return 0;
    };

    return Math.round((numDays * currentDestination.estimatedLodgingCostPerDay
      + numTravelers * currentDestination.estimatedFlightCostPerPerson) * 1.1);
  };
};

export default Destinations;