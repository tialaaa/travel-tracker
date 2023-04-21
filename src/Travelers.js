class Travelers {
  constructor(arrayOfTravelers) {
    this.allData = arrayOfTravelers
    this.currentUser = undefined
  };

  findById(userID) {
    this.currentUser = this.allData.find(traveler => traveler.id === userID);

    return this.currentUser;
  };
};

export default Travelers;