class Travelers {
  constructor(arrayOfTravelers) {
    this.allTravelers = arrayOfTravelers
    this.currentUser = undefined
  };

  findUserById(userID) {
    this.currentUser = this.allTravelers.find(traveler => traveler.id === userID);

    return this.currentUser;
  };

  printUserInfo(key) {
    if (!this.currentUser || !this.currentUser[key]) {
      return undefined
    };

    return this.currentUser[key];
  };
}

export default Travelers;