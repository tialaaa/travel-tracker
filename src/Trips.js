const dayjs = require('dayjs');

class Trips {
  constructor(arrayOfTrips) {
    this.allData = arrayOfTrips
  };

  findSortedUserTrips(userID) {
    let filteredList = this.allData.filter(trip => trip.userID === userID);

    return filteredList.sort((a,b) => {
      const dateA = dayjs(a.date).format('YYYY/MM/DD');
      const dateB = dayjs(b.date).format('YYYY/MM/DD');

      if (dateA < dateB) {
        return 1
      };

      if (dateA > dateB) {
        return -1
      };
      
      return 0;
    });
  };

  calcTotalCost(userID, destinationsArray) {
    let filteredTrips;

    if (!userID) {
      filteredTrips = this.allData;
    } else if (typeof userID !== 'number') {
      return undefined;
    } else {
      filteredTrips = this.findSortedUserTrips(userID);
    };

    return filteredTrips.reduce((acc, current) => {
      let locationInfo = destinationsArray.allData.find(destination => destination.id === current.destinationID);

      if (locationInfo) {
        acc += Math.round((current.duration * locationInfo.estimatedLodgingCostPerDay
          + current.travelers * locationInfo.estimatedFlightCostPerPerson) * 1.1);
      };

      return acc;
    }, 0);
  };
};

export default Trips;