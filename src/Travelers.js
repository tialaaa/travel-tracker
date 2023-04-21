class Travelers {
  constructor(arrayOfTravelers) {
    this.allTravelers = arrayOfTravelers
    this.currentUser = undefined
  };

  findById(userID) {
    this.currentUser = this.allTravelers.find(traveler => traveler.id === userID);

    return this.currentUser;
  };
};

export default Travelers;