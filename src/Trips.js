class Trips {
  constructor(arrayOfTrips) {
    this.allData = arrayOfTrips
  };

  findTripsBy(searchKey, searchValue) {
    // If this isn't used to filter by status for agent, change to userID prop only
    return this.allData.filter(trip => trip[searchKey] === searchValue)
  };

  calculateTotalCost(userID, destinationsArray) {
    let filteredTrips;

    if (!userID) {
      filteredTrips = this.allData;
    } else if (typeof userID !== 'number') {
      return undefined;
    } else {
      filteredTrips = this.findTripsBy('userID', userID);
    };

    return filteredTrips.reduce((acc, current) => {
      let locationInfo = destinationsArray.allData.find(destination => destination.id === current.destinationID);

      if (locationInfo) {
        acc += Math.round((current.duration * locationInfo.estimatedLodgingCostPerDay
          + current.travelers * locationInfo.estimatedFlightCostPerPerson) * 1.1);
      }

      return acc;
    }, 0);
  };
};

export default Trips;