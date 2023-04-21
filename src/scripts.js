import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { getData, postData } from './fetch-calls.js'
import Travelers from './Travelers.js'
import Trips from './Trips.js'
import Destinations from './Destinations.js'

let travelers, trips, destinations;
let userID = 5;

// console.log(getData('travelers/1'))

window.addEventListener('load', () => {
  getInitialData();
});

function getInitialData() {
  Promise.all([getData('travelers'), getData('trips'), getData('destinations')])
  .then(data => {
    travelers = new Travelers(data[0].travelers);
    trips = new Trips(data[1].trips);
    destinations = new Destinations(data[2].destinations);
  })
  .then(() => {
    travelers.findById(userID)
    console.log(travelers)
  })
  .catch(err => console.log(err))
}