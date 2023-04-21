class Destinations {
  constructor(arrayOfDestinations) {
    this.allDestinations = arrayOfDestinations
  };

  findById(destinationID) {
    return this.allDestinations.find(place => place.id === destinationID);
  };

  calculateTripCost(destinationID, numDays, numTravelers) {
    let currentDestination = this.allDestinations.find(place => place.id === destinationID);
    
    if (!currentDestination) {
      return 0;
    };

    return Math.round((numDays * currentDestination.estimatedLodgingCostPerDay
      + numTravelers * currentDestination.estimatedFlightCostPerPerson) * 1.1);
  };
};

export default Destinations;