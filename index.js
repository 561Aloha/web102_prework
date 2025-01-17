// import the JSON data about the crowd-funded games from the games.js file
import GAMES_DATA from './games.js';
// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Remove existing child elements from the games container
    deleteChildElements(gamesContainer);
        for (let i = 0; i < games.length; i++) {
            //The Template literal being used to show attributes game image, 'name' and 'description'
            const display = `
                <div class="game-card">
                    <img src="${games[i].img}" alt="${games[i].name}" class="game-img">
                    <h2>${games[i].name}</h2>
                    <p>${games[i].description}</p>
                </div>
            `;
        // Create a new div element, which will become the game card
        const gameCard = document.createElement("div");
        // Add the class "game-card" to the list
        gameCard.classList.add("game-card");
        // Set the inner HTML using a template literal to display info about each game
        gameCard.innerHTML = display;
        // Append the game card to the games container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function to add games to the page using the provided data
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
var totalContr = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContr.toLocaleString("en-US")}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const gamesNum = GAMES_JSON.length;
gamesCard.innerHTML = `${gamesNum}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let notMetGoalList = GAMES_JSON.filter ( (game) => {
        return game.goal > game.pledged;
      });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(notMetGoalList);
    return notMetGoalList.length;
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have met or exceeded their goal
    let metGoalList = GAMES_JSON.filter ( (game) => {
        return game.goal <= game.pledged; });
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(metGoalList);
    return metGoalList.length;
}

function showAllGames() {//SHOW ALL GAMES
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let unfundedCount = GAMES_JSON.filter((game) => game.goal > game.pledged).length;
let unfundedString = `There ${unfundedCount === 1 ? 'is' : 'are'} ${unfundedCount} ${unfundedCount === 1 ? 
    'game' : 'games'} that have not yet met their funding goal.`;

let descriptionElement = document.createElement('p');
descriptionElement.textContent = unfundedString;

// Now you can append descriptionElement to the DOM as needed

// Append the new DOM element to the description container (assuming you have a container with id 'descriptionContainer')
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");

const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [TopFundedGame, RunnerUp, ...rest] = sortedGames;

// create a new element to hold the name and image of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("div");
const topGameImage = document.createElement("img");
topGameImage.src = TopFundedGame.img;
topGameImage.width,topGameImage.height = 175;
topGameElement.appendChild(topGameImage);
const topGameName = document.createElement("p");
topGameName.textContent = `${TopFundedGame.name}`;
topGameElement.appendChild(topGameName);
firstGameContainer.appendChild(topGameElement);

// do the same for the runner-up item
const runnerUpElement = document.createElement("div");
const runnerUpImage = document.createElement("img");
runnerUpImage.src = RunnerUp.img;
runnerUpImage.width, runnerUpImage.height= 175;
runnerUpElement.appendChild(runnerUpImage);
const runnerUpName = document.createElement("p");
runnerUpName.textContent = `${RunnerUp.name}`;
runnerUpElement.appendChild(runnerUpName);
secondGameContainer.appendChild(runnerUpElement);
