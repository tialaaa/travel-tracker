# Travel Tracker: Adventure Awaits

### Abstract:
[//]: <> (Briefly describe what you built and its features. What problem is the app solving? How does this application solve that problem?)
Travel Tracker is a web application for managing and tracking different travel plans. Upon logging in, the user is able to review their past and upcoming trip details, and submit new trip booking requests to an anonymous travel agent. With server data included for 50 users, 50 destinations, and over 200 historical trips, the app seamlessly validates and makes network requests for any traveler. Let's book a trip!

### Installation Instructions:
[//]: <> (What steps does a person have to take to get your app cloned down and running?)
NOTE - This app makes network requests to local server data. You will need to clone down two repositories, install dependencies for both, and run both in separate tabs within your terminal each time you run the app. Follow the below instructions.

1. Open your terminal and navigate to where you would like to store the repositories. **They will need to share a root folder.**
2. Open the local server data repo: https://github.com/turingschool-examples/travel-tracker-api
3. Using the `SSH` key, paste `git clone git@github.com:turingschool-examples/travel-tracker-api` into your terminal.
4. `cd` into the server's repository on your local machine and run `npm install` or `npm i` to install project dependencies.
5. Run `npm start` to launch the API's server.
6. Open the app's Github repo: https://github.com/tialaaa/travel-tracker
7. In a new tab within your terminal, paste `git clone git@github.com:tialaaa/travel-tracker.git` to clone using the `SSH` key. 
8. `cd` into the app's repository on your local machine and run `npm install` or `npm i` to install project dependencies.
9. Run `npm start` to launch this API's server.
10. Open the `http://localhost:8080/` link to your local server (also listed in your terminal) in your web browser to view the live page.
11. `Control + C` is the command to stop running the local server. Run `Control + C` in **both** terminal tabs to fully disconnect.

### Preview of App:
![Travel-Tracker-preview-gif](https://user-images.githubusercontent.com/121128718/234365780-e64caefa-e980-47d1-a05e-66bda52e60be.gif)

### Context:
[//]: <> (Give some context for the project here. How long did you have to work on it? How far into the Turing program are you?)
Completed over one week, this was my final project of module 2 at the Turing School.

### Contributors:
[//]: <> (Who worked on this application? Link to their GitHubs.)
Solo project by Tiala Young: [GitHub](https://github.com/tialaaa), [LinkedIn](https://www.linkedin.com/in/tialayoung/)

### Technologies Used:
- Fetch API
- Day.js 3rd party library
- Webpack module bundler
- JavaScript
- CSS
- HTML
- Mocha & Chai
- Test driven development
- Git, GitHub, Trello project board

### Learning Goals:
[//]: <> (What were the learning goals of this project? What tech did you work with?)
- Use OOP to drive the design of a client-side application and its code
- Work with an API to send and receive data
- Implement a robust test suite using TDD that thoroughly tests all functionality
- Create a user interface that is easy to use and follows best practices for a11y
- Present a live demo of the application and its Lighthouse accessibility score

[//]: <> (### Wins & Challenges:)
[//]: <> (What are 2-3 wins you have from this project? What were some challenges you faced - and how did you get over them?)

