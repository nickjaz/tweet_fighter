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
  console.log('button remove')
  form.removeChild(button);
  console.log('set display to fight')
  display.setAttribute('class','fight');
  console.log('set inputTwit One/Two to active')
  inputTwitOne.setAttribute('class', 'active');
  inputTwitTwo.setAttribute('class', 'active');
  console.log('set displayBox to show')
  // displayBox.removeAttribute('class', 'display_block');
  displayBox.setAttribute('class', 'show');
  console.log('is it working?')
  // inputTwitOne.disable = true;
  // inputTwitOne.disable = true;

}

//Displays the data
function renderFavourites() {
  favouritesOne.innerHTML = twitOneObj.favourites; //replace this with favourites method
  favouritesTwo.innerHTML = twitTwoObj.favourites;
  favouritesImg.innerHTML = '#';
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
  reTweetsImg.innerHTML = '#';
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
  warScoreImg.innerHTML = '#';
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
