import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { getData, postData } from './fetch-calls.js'
import Travelers from './Travelers.js'
import Trips from './Trips.js'
import Destinations from './Destinations.js'
import Glide from '@glidejs/glide'
// import "@glidejs/glide/src/assets/sass/glide.core"
// import "@glidejs/glide/src/assets/sass/glide.theme"
// new Glide('.glide').mount()
const dayjs = require('dayjs')
// dayjs().format()

const greeting = document.getElementById('userGreeting');
const profileName = document.getElementById('userFullName');
const profileType = document.getElementById('travelerType');
const profileCost = document.getElementById('annualCost');
const pastTripsCont = document.getElementById('pastTripsCont');
const futureTripsCont = document.getElementById('futureTripsCont');
const messageNoUpcoming = document.getElementById('messageNoUpcoming');

let travelers, trips, destinations;
let userID = 45;
// variable 'today' for testing use only; remove before final push
let today = dayjs("2020-05-25")
// console.log(getData('travelers/1'))

const USDollar = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

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
    displayUpcomingTrips()
  })
  .catch(err => console.log(err))
};

function displayUserInfo() {
  greeting.innerText = `Welcome, ${travelers.printFirstName()}!`;
  profileName.innerText = `Full name: ${travelers.currentUser.name}`;
  profileType.innerText = `Traveler type: ${travelers.currentUser.travelerType}`;
  profileCost.innerText = `You've spent ${USDollar.format(trips.calculateTotalCost(userID, destinations))} on trips`;
};

function displayPastTrips() {
  let pastTrips = trips.findSortedTripsBy('userID', userID).filter(trip => {
    let parsedDate = dayjs(trip.date, ["YYYY-MM-DD", "YYYY-M-DD"]);
    // return parsedDate < dayjs();
    return parsedDate < dayjs(today);
  });

  pastTrips.forEach(trip => {
    let currentDest = destinations.findById(trip.destinationID);

    pastTripsCont.innerHTML += `
      <div class="trip-card">
        <img src="${currentDest.image}" alt="${currentDest.alt}">
        <div class="trip-info">
          <p class="dest-name">${currentDest.destination}</p>
          <p>Date: ${dayjs(trip.date).format('MMM DD, YYYY')}</p>
          <p>Days on Trip: ${trip.duration}</p>
          <p>Traveler Count: ${trip.travelers}</p>
        </div>
      </div>
    `
  });
};

function displayUpcomingTrips() {
  let futureTrips = trips.findSortedTripsBy('userID', userID).filter(trip => {
    let parsedDate = dayjs(trip.date, ["YYYY-MM-DD", "YYYY-M-DD"]);
    // return parsedDate > dayjs();
    return parsedDate > dayjs(today);
  });

  if (futureTrips.length === 0) {
    messageNoUpcoming.classList.remove('hidden');
    return;
  } else {
    messageNoUpcoming.classList.add('hidden');
    futureTrips.forEach(trip => {
      let currentDest = destinations.findById(trip.destinationID);
  
      futureTripsCont.innerHTML += `
        <div class="trip-card">
          <img src="${currentDest.image}" alt="${currentDest.alt}">
          <div class="trip-info">
            <p class="dest-name">${currentDest.destination}</p>
            <p>Date: ${dayjs(trip.date).format('MMM DD, YYYY')}</p>
            <p>Days on Trip: ${trip.duration}</p>
            <p>Traveler Count: ${trip.travelers}</p>
          </div>
        </div>
      `
    });
  };
};
