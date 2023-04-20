class Travelers {
  constructor(arrayOfTravelers) {
    this.allTravelers = arrayOfTravelers
    this.currentUser = undefined
  };

  findUserById(searchId) {
    this.currentUser = this.allTravelers.find(traveler => traveler.id === searchId);

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