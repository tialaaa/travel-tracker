import './css/styles.css';
import './images/hot-air-balloon-black-2.png';
import { getData, postData } from './fetch-calls.js';
import Travelers from './Travelers.js';
import Trips from './Trips.js';
import Destinations from './Destinations.js';
const dayjs = require('dayjs');

const loginPage = document.getElementById('containerLogin');
const mainPage = document.getElementById('containerMain');
const loginForm = document.getElementById('loginForm');
const greeting = document.getElementById('userGreeting');
const profileName = document.getElementById('userFullName');
const profileType = document.getElementById('travelerType');
const profileCost = document.getElementById('annualCost');
const pastTripsCont = document.getElementById('pastTripsCont');
const pastSection = document.getElementById('pastSection');
const futureTripsCont = document.getElementById('futureTripsCont');
const messageNoUpcoming = document.getElementById('messageNoUpcoming');
const buttonLogout = document.getElementById('buttonLogout');
const requestForm = document.getElementById('requestForm');
const formList = document.getElementById('destinationList');
const formStartDate = document.getElementById('startDate');
const formEndDate = document.getElementById('endDate');
const estimateCost = document.getElementById('estimateCost');

// VARIABLE 'TODAY' TO BE USED FOR DEMO
let today = dayjs("2021-05-25");
let defaultStartDate = today;
let travelers, trips, destinations, successfulRequest;

// VARIABLE 'USERID' TO BE USED FOR DEMO
let userID = 10;

const USDollar = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

// LINES 42-61 REVISED FOR DEMO
window.addEventListener('load', () => {
  loadInitialData();
  showUserDashboard();
  populateFormDates();
});

// window.addEventListener('load', showLoginPage()
// );

// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   validateLogin();
// });

// buttonLogout.addEventListener('click', (e) => {
//   e.preventDefault();
//   userID = undefined;
//   showLoginPage();
//   loginForm.reset();
// })

requestForm.addEventListener('change', (e) => {
  if (e.target === formStartDate) {
    defaultStartDate = formStartDate.value;
    autoupdateEndDate();
  };
  
  let currentInputs = validateRequest();
  showTripEstimate(currentInputs);
});

requestForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validateRequest()) {
    resetForm();
    removeClass(estimateCost, 'shown');
    estimateCost.innerHTML = ``;

    Promise.resolve(postData('trips', successfulRequest))
    .then(() => {
      getData('trips')
      .then(responseJson => {
        trips = new Trips(responseJson.trips)
        alert('Your trip request has been submitted for agent approval.')
        displayUpcomingTrips()
      })
      .catch(err => console.log(err))
    });
  };
});

function validateLogin() {
  const loginData = new FormData(loginForm);
  const submittedPass = loginData.get('password');
  const submittedUsername = loginData.get('username').split('');
  const submittedUserString = submittedUsername.slice(0, 8).join('');
  const submittedUserNum = parseInt(submittedUsername.slice(8).join(''));

  Promise.resolve(getData(`travelers/${submittedUserNum}`))
    .then(data => {
      if (!validateUserID(data, submittedUserNum, submittedUserString) || !validatePassword(submittedPass)) {
        return false;
      } else {
        userID = submittedUserNum;
        showUserDashboard();
        loadInitialData();
        populateFormDates();
      };
    })
    .catch(err => console.log(err));

  loginForm.reset();
};

function validatePassword(passToCheck) {
  if (passToCheck !== 'travel') {
    alert('Incorrect password');
    loginForm.reset();
    return false;
  };
  return true;
};

function validateUserID(responseObject, number, string) {
  if (responseObject.message === `No traveler found with an id of ${number}` || string !== 'traveler') {
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
      travelers.findById(userID);
      resetForm();
      displayUserInfo();
      displayPastTrips();
      displayUpcomingTrips();
    })
    .catch(err => console.log(err))
};

function resetForm() {
  defaultStartDate = today;
  requestForm.reset();
  populateFormDates();
  populateFormList();
};

function populateFormDates() {
  formStartDate.value = dayjs(defaultStartDate).format('YYYY-MM-DD');
  formEndDate.value = dayjs(defaultStartDate).add(1,'day').format('YYYY-MM-DD');
  formStartDate.setAttribute("min", today.format('YYYY-MM-DD'));
  formEndDate.setAttribute("min", dayjs(defaultStartDate).add(1,'day').format('YYYY-MM-DD'));
};

function autoupdateEndDate() {
  formEndDate.value = dayjs(defaultStartDate).add(1,'day').format('YYYY-MM-DD');
};

function populateFormList() {
  destinations.allData.forEach(location => {
    formList.innerHTML += `
      <option value="${location.destination}">${location.destination}</option>
    `
  });
};

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

function showTripEstimate(inputs) {
  let currentEstimate = destinations.calcTripEstimate(inputs.destinationID, inputs.duration, inputs.travelers);
  estimateCost.innerHTML = `Cost Estimate: ${USDollar.format(currentEstimate)}`;
  addClass(estimateCost, 'shown');
};

function displayUserInfo() {
  greeting.innerText = `Welcome, ${travelers.printFirstName()}!`;
  profileName.innerText = `Full name: ${travelers.currentUser.name}`;
  profileType.innerText = `Traveler type: ${travelers.currentUser.travelerType}`;
  profileCost.innerText = `You've spent ${USDollar.format(trips.calcTotalCost(userID, destinations))} on trips`;
};

function displayPastTrips() {
  let pastTrips = trips.findSortedUserTrips(userID).filter(trip => {
    let parsedDate = dayjs(trip.date, ["YYYY-MM-DD", "YYYY-M-DD"]);
    return parsedDate < dayjs(today);
  });

  if (pastTrips.length === 0) {
    addClass(pastSection, 'hidden')
    return;
  } else {
    removeClass(pastSection, 'hidden')
  };

  renderTripCards(pastTripsCont, pastTrips);
};

function displayUpcomingTrips() {
  let futureTrips = trips.findSortedUserTrips(userID).filter(trip => {
    let parsedDate = dayjs(trip.date, ["YYYY-MM-DD", "YYYY-M-DD"]);
    return parsedDate >= dayjs(today);
  });

  if (futureTrips.length === 0) {
    removeClass(messageNoUpcoming, 'hidden')
    return;
  } else {
    addClass(messageNoUpcoming, 'hidden')
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
        <div class="image-cont">
          <img src="${currentDest.image}" alt="${currentDest.alt}">
        </div>
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

function removeClass(element, className) {
  element.classList.remove(className)
};

function addClass(element, className) {
  element.classList.add(className)
};

function showLoginPage() {
  removeClass(loginPage, 'hidden');
  addClass(mainPage, 'hidden');
  addClass(buttonLogout, 'hidden');
};

function showUserDashboard() {
  addClass(loginPage, 'hidden');
  removeClass(mainPage, 'hidden');
  removeClass(buttonLogout, 'hidden');
};
