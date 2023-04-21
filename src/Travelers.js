class Travelers {
  constructor(arrayOfTravelers) {
    this.allData = arrayOfTravelers
    this.currentUser = undefined
  };

  findById(userID) {
    this.currentUser = this.allData.find(traveler => traveler.id === userID);

    return this.currentUser;
  };

  printFirstName() {
    return !this.currentUser ? undefined : this.currentUser.name.split(' ')[0];
  };
};

export default Travelers;