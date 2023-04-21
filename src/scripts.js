import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { getData, postData } from './fetch-calls.js'
import Travelers from './Travelers.js'
import Trips from './Trips.js'
import Destinations from './Destinations.js'
const dayjs = require('dayjs')
dayjs().format()

const greeting = document.getElementById('userGreeting');
const profileName = document.getElementById('userFullName');
const profileType = document.getElementById('travelerType');
const profileCost = document.getElementById('annualCost');

let travelers, trips, destinations;
let userID = 5;

const USDollar = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

// console.log(getData('travelers/1'))

window.addEventListener('load', () => {
  loadInitialData();
});

function loadInitialData() {
  Promise.all([getData('travelers'), getData('trips'), getData('destinations')])
  .then(data => {
    travelers = new Travelers(data[0].travelers);
    trips = new Trips(data[1].trips);
    destinations = new Destinations(data[2].destinations);
  })
  .then(() => {
    travelers.findById(userID)
    console.log(travelers)
    displayUserInfo()
    displayPastTrips()
  })
  .catch(err => console.log(err))
}

function displayUserInfo() {
  greeting.innerText = `Welcome, ${travelers.printFirstName()}!`;
  profileName.innerText = `Full name: ${travelers.currentUser.name}`;
  profileType.innerText = `Traveler type: ${travelers.currentUser.travelerType}`;
  profileCost.innerText = `You have spent ${USDollar.format(trips.calculateTotalCost(userID, destinations))} on trips`;
}

function displayPastTrips() {
  // trips.findSortedTripsBy('userID', userID)
  // filter result to historical DATES only -> use day.js to accurately parse trip.date for comparison against Date.now()
  // iterate over that array, adding new list items and innerHTML for each element
  let pastTrips = trips.findSortedTripsBy('userID', userID).filter(trip => trip.status === 'approved')

  console.log(pastTrips)
  console.log(Date.now())
  var now = dayjs()
  console.log(now)
}