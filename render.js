//Getting Elements
var display = document.getElementById('display');
var form = document.getElementById('form');
var button = document.getElementById('toggler');
var inputTwitOne = document.getElementById('twitOne');
var inputTwitTwo = document.getElementById('twitTwo');
var favouritesOne = document.getElementById('favourites_one');
var reTweetsOne = document.getElementById('retweets_one');
var warScoreOne = document.getElementById('warscore_one');
var favouritesTwo = document.getElementById('favourites_two');
var reTweetsTwo = document.getElementById('retweets_two');
var warScoreTwo = document.getElementById('warscore_two');
var favouritesImg = document.getElementById('favourites_img');
var reTweetsImg = document.getElementById('retweets_img');
var warScoreImg = document.getElementById('warscore_img');
var displayBox = document.getElementById('display_block');
var twitOne = '';
var twitTwo = '';
var twitOneObj;
var twitTwoObj;

//Placeholder code for submitting button
form.addEventListener('submit', pickAFight);

//Calculating information from the fight
function pickAFight(event) {
  event.preventDefault();

  twitOne = event.target.twitOne.value.toUpperCase();
  twitTwo = event.target.twitTwo.value.toUpperCase();
  nameTwits(twitOne, twitTwo);
  getTweetValues();
  getWarScore();
  renderResults();
}

//Placeholder code
function nameTwits(twitOne, twitTwo) {
  twitOneObj = new Twit(twitOne);
  twitTwoObj = new Twit(twitTwo);
}

//Placeholder
function Twit(screen_name) {
  this.screen_name = screen_name;
}

//Dummy data
function getTweetValues() {
  twitOneObj.favourites = 4050;
  twitOneObj.reTweets = 1320 * 1.5;
  twitTwoObj.favourites = 3600;
  twitTwoObj.reTweets = 1600 * 1.5;
}

//Calculate warscore
function getWarScore() {
  twitOneObj.warScore = twitOneObj.favourites + twitOneObj.reTweets;
  twitTwoObj.warScore = twitTwoObj.favourites + twitTwoObj.reTweets;
}

//Encapsulating the render functions
function renderResults() {
  expandAndCenter();
  setTimeout(renderFavourites, 500);
  setTimeout(renderFavouritesWinner, 1500);
  setTimeout(renderReTweets, 2000);
  setTimeout(renderReTweetsWinner, 3000);
  setTimeout(renderWarScore, 3500);
  setTimeout(renderWareScoreWinner, 4500);
  setTimeout(renderGrandWinner, 5500);
}

function expandAndCenter(){
  form.removeChild(button);
  display.setAttribute('class','expand');
  inputTwitOne.setAttribute('class', 'center');
  inputTwitTwo.setAttribute('class', 'center');
  displayBox.setAttribute('class', 'show');
  inputTwitOne.disable = true;
  inputTwitOne.disable = true;
}

//Displays the data, all functions below part of the render results func ^ above ^
function renderFavourites() {
  favouritesOne.innerHTML = twitOneObj.favourites; //replace this with favourites method
  favouritesTwo.innerHTML = twitTwoObj.favourites;
  favouritesImg.setAttribute('class', 'icon');
  favouritesImg.setAttribute('src', 'https://image.flaticon.com/icons/png/128/148/148836.png');
}

//Show winner
function renderFavouritesWinner() {
  if (twitOneObj.favourites > twitTwoObj.favourites) {
    favouritesOne.setAttribute('class', 'winner');
    favouritesTwo.setAttribute('class', 'loser');
  } else {
    favouritesOne.setAttribute('class', 'loser');
    favouritesTwo.setAttribute('class', 'winner');
  }
}

function renderReTweets() {
  reTweetsOne.innerHTML = twitOneObj.reTweets;
  reTweetsTwo.innerHTML = twitTwoObj.reTweets;
  reTweetsImg.setAttribute('class', 'icon');
  reTweetsImg.setAttribute('src', 'https://maxcdn.icons8.com/Share/icon/Messaging//retweet1600.png');
}

function renderReTweetsWinner(){
  if (twitOneObj.reTweets > twitTwoObj.reTweets) {
    reTweetsOne.setAttribute('class', 'winner');
    reTweetsTwo.setAttribute('class', 'loser');
  } else {
    reTweetsOne.setAttribute('class', 'loser');
    reTweetsTwo.setAttribute('class', 'winner');
  }
}

function renderWarScore() {
  warScoreOne.innerHTML = twitOneObj.warScore;
  warScoreTwo.innerHTML = twitTwoObj.warScore;
  warScoreImg.setAttribute('class', 'icon');
  warScoreImg.setAttribute('src', 'https://d30y9cdsu7xlg0.cloudfront.net/png/147870-200.png');
}

function renderWareScoreWinner(){
  if (twitOneObj.warScore > twitTwoObj.warScore) {
    warScoreOne.setAttribute('class', 'winner');
    warScoreTwo.setAttribute('class', 'loser');
  } else {
    warScoreOne.setAttribute('class', 'loser');
    warScoreTwo.setAttribute('class', 'winner');
  }
}

function renderGrandWinner() {
  if (twitOneObj.warScore > twitTwoObj.warScore) {
    inputTwitOne.setAttribute('class', 'grand_winner');
    inputTwitTwo.setAttribute('class', 'grand_loser');
  } else {
    inputTwitOne.setAttribute('class', 'grand_loser');
    inputTwitTwo.setAttribute('class', 'grand_winner');
  }
}
