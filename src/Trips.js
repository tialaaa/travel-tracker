class Trips {
  constructor(arrayOfTrips) {
    this.allTrips = arrayOfTrips
  };

  findTripsBy(searchKey, searchValue) {
    // If this isn't used to filter by status, change to userID only
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

  calculateTotalCost(userID) {
    // need Destination class to finish
  }
}

export default Trips;