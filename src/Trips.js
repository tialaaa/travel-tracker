class Trips {
  constructor(arrayOfTrips) {
    this.allTrips = arrayOfTrips
  };

  findTripsBy(searchKey, searchValue) {
    // If this isn't used to filter by status for agent, change to userID prop only
    return this.allTrips.filter(trip => trip[searchKey] === searchValue)
  };

  // Super dynamic function below - contains errors
  // findTripsBy(IdNumber, ...status) {
  //   let currentTripsFilter;
  //   console.log(status)

  //   // if (!IdNumber) {
  //   //   return console.log('Error: userID needs to be a number')
  //   // }

  //   if (IdNumber || IdNumber === undefined && status.length === 0) {
  //     // console.log('row 15')
  //     return currentTripsFilter = this.allTrips.filter(trip => trip.userID === IdNumber);
  //   } else {
  //     console.log('row 18')
  //     currentTripsFilter = this.allTrips;
  //   };

  //   if (status.length === 1) {
  //     console.log('row 23')
  //     return currentTripsFilter.filter((trip => trip.status === status[0]))
  //   } else {
  //     console.log('row 26')
  //     return currentTripsFilter.reduce((acc, currentTrip) => {
  //       status.forEach(status => {
  //         if (currentTrip.status === status) {
  //           acc.push(currentTrip)
  //         }
  //       })

  //       return acc
  //     }, [])
  //   };
  // };

  calculateTotalCost(userID, destinationsArray) {
    let filteredTrips;

    if (!userID) {
      filteredTrips = this.allTrips;
    } else if (typeof userID !== 'number') {
      return undefined;
    } else {
      filteredTrips = this.findTripsBy('userID', userID);
    };

    return filteredTrips.reduce((acc, current) => {
      let locationInfo = destinationsArray.allDestinations.find(destination => destination.id === current.destinationID);

      if (locationInfo) {
        acc += Math.round((current.duration * locationInfo.estimatedLodgingCostPerDay + current.travelers * locationInfo.estimatedFlightCostPerPerson) * 1.1);
      }

      return acc;
    }, 0);
  };
}

export default Trips;