import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/hot-air-balloon-black-2.png'
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

const loginPage = document.getElementById('containerLogin');
const mainPage = document.getElementById('containerMain');
const loginForm = document.getElementById('loginForm');
const greeting = document.getElementById('userGreeting');
const profileName = document.getElementById('userFullName');
const profileType = document.getElementById('travelerType');
const profileCost = document.getElementById('annualCost');
const pastTripsCont = document.getElementById('pastTripsCont');
const futureTripsCont = document.getElementById('futureTripsCont');
const messageNoUpcoming = document.getElementById('messageNoUpcoming');
const buttonBookTrip = document.getElementById('bookTrip');
const requestForm = document.getElementById('requestForm');
const formList = document.getElementById('destinationList');
const formStartDate = document.getElementById('startDate');
const formEndDate = document.getElementById('endDate');
const estimateCost = document.getElementById('estimateCost');

// variable 'today' for testing use only; remove before final push
let today = dayjs("2020-05-25");
let todayInputFormat = today.format('YYYY-MM-DD')
let tomorrowInputFormat = today.add(1,'day').format('YYYY-MM-DD')

let travelers, trips, destinations, successfulRequest;
let userID = 5;
// console.log(getData('travelers/1'))

const USDollar = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

window.addEventListener('load', () => {
  loginPage.classList.remove('hidden');
  mainPage.classList.add('hidden');
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  validateLogin();

  // if successful, switch the pages & call these functions
  loadInitialData();
  populateFormDates();
});

function validateLogin() {
  const loginData = new FormData(loginForm);
  const submittedPass = loginData.get('password');
  const submittedID = loginData.get('username').split('');
  const submittedString = submittedID.slice(0, 8).join('');
  const submittedNum = parseInt(submittedID.slice(8).join(''));

  Promise.all([getData(`travelers/${submittedNum}`)])
    .then(data => {
      if (!validateUserID(data, submittedNum, submittedString) || !validatePassword(submittedPass)) {
        return;
      } else {
        loginPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
        loadInitialData();
        populateFormDates();
      };
    })
    .catch(err => console.log(err))
  
  
};

function validatePassword(passToCheck) {
  if (passToCheck !== 'travel') {
    alert('Incorrect password');
    loginForm.reset();
    return false;
  };
  return true;
};

function validateUserID(responseArray, number, string) {
  if (responseArray[0].message === `No traveler found with an id of ${number}`) {
    console.log('number wrong')
    alert('Incorrect username');
    loginForm.reset();
    return false;
  } else if (string !== 'traveler') {
    console.log('string wrong')
    alert('Incorrect username');
    loginForm.reset();
    return false;
  };
  return true;
};

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
      resetForm()
      displayUserInfo()
      displayPastTrips()
      displayUpcomingTrips()
      console.log(trips)
    })
    .catch(err => console.log(err))
  };

function resetForm() {
  requestForm.reset();
  populateFormDates();
  populateFormList();
};

function populateFormDates() {
  formStartDate.value = todayInputFormat;
  formEndDate.value = tomorrowInputFormat;
  formStartDate.setAttribute("min", todayInputFormat);
  formEndDate.setAttribute("min", tomorrowInputFormat);
};

function populateFormList() {
  destinations.allData.forEach(location => {
    formList.innerHTML += `
      <option value="${location.destination}">${location.destination}</option>
    `
  });
};

requestForm.addEventListener('change', (e) => {
  let inputs = validateRequest();
  let currentEstimate = destinations.calculateTripCost(inputs.destinationID, inputs.duration, inputs.travelers);

  estimateCost.classList.add('shown');
  estimateCost.innerHTML = `Cost Estimate: ${USDollar.format(currentEstimate)}`;
});

requestForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validateRequest()) {
    console.log('Validate successful')
    resetForm();
    estimateCost.innerHTML = ``;
    estimateCost.classList.remove('shown');

    Promise.all([postData('trips', successfulRequest)])
      .then(() => {
        getData('trips')
        .then(responseJson => {
          console.log(responseJson)
          trips = new Trips(responseJson.trips)
          alert('Your trip request has been submitted for agent approval.')
          displayUpcomingTrips()
        })
        // .then(() => {
        // })
        .catch(err => console.log(err))
      });
  };
});

function validateRequest() {
  const requestData = new FormData(requestForm);
  const chosenDest = destinations.allData.find(place => place.destination === requestData.get('destinationList'));
  const chosenCount = requestData.get('travelerCount');
  let start = dayjs(requestData.get('startDate'), ["YYYY-MM-DD"]);
  let end = dayjs(requestData.get('endDate'), ["YYYY-MM-DD"]);
  const chosenDuration = end.diff(start, 'day');

  if (!chosenDest) {
    alert('Destination not valid. Please choose again.');
    return false;
  };

  if (chosenDuration <= 0) {
    alert('End date must be after start date. Please check your calendar selections.');
    return false;
  };

  if (chosenCount <= 0 || isNaN(chosenCount)) {
    alert('Trips must have at least one traveler. Please check your selection.');
    return false;
  };

  return successfulRequest =  {
    id: Date.now(),
    userID: userID,
    destinationID: chosenDest.id,
    travelers: parseInt(chosenCount),
    date: start.format('YYYY/MM/DD'),
    duration: chosenDuration,
    status: 'pending',
    suggestedActivities: []
  };
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

  renderTripCards(pastTripsCont, pastTrips);
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
  };

  renderTripCards(futureTripsCont, futureTrips);
};

function renderTripCards(tripsContainer, tripsArray) {
  tripsContainer.innerHTML = '';

  tripsArray.forEach(trip => {
    let currentDest = destinations.findById(trip.destinationID);
    let hiddenStatus;

    if (trip.status !== 'pending') {
      hiddenStatus = 'hidden'
    };

    tripsContainer.innerHTML += `
      <div class="trip-card">
        <span class="status-flag ${hiddenStatus}">Status: ${trip.status}</span>
        <img src="${currentDest.image}" alt="${currentDest.alt}">
        <div class="trip-info">
          <h4 class="dest-name">${currentDest.destination}</h4>
          <p>Date: ${dayjs(trip.date).format('MMM DD, YYYY')}</p>
          <p>Days on Trip: ${trip.duration}</p>
          <p>Travelers: ${trip.travelers}</p>
        </div>
      </div>
    `
  });
};