class Trips {
  constructor(arrayOfTrips) {
    this.allTrips = arrayOfTrips
  };

  // findTripsBy(searchKey, searchValue) {
  //   // variation for only 1 search type at a time
  //   return this.allTrips.filter(trip => trip[searchKey] === searchValue)
  // };

  findTripsBy(userID, ...status) {
    let currentTripsFilter;

    if (userID) {
      currentTripsFilter = this.allTrips.filter(trip => trip.userID === userID);
    } else {
      currentTripsFilter = this.allTrips;
    };

    if (status.length === 1) {
      return currentTripsFilter.filter((trip => trip.status === status[0]))
    } else {
      return currentTripsFilter.reduce((acc, currentTrip) => {
        status.forEach(status => {
          if (currentTrip.status === status) {
            acc.push(currentTrip)
          }
        })

        return acc
      }, [])
    };
  };
}

export default Trips;