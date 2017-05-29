
var display = document.getElementById('display');
var form = document.getElementById('form');
var button = document.getElementById('toggler');
var inputTwitOne = document.getElementById('twitOne');
var inputTwitTwo = document.getElementById('twitTwo');
var resultsOne = document.getElementById('results_one');
var resultsTwo = document.getElementById('results_two');
var resultsKey = document.getElementById('results_key');
var twitOne = '';
var twitTwo = '';
var twitOneObj;
var twitTwoObj;

form.addEventListener('submit', pickAFight);

function pickAFight(event) {
  event.preventDefault();

  twitOne = event.target.twitOne.value.toUpperCase();
  twitTwo = event.target.twitTwo.value.toUpperCase();
  nameTwits(twitOne, twitTwo);
  getTweetValues();
  getWarScore();
  renderResults();
}

function nameTwits(twitOne, twitTwo) {
  twitOneObj = new Twit(twitOne);
  twitTwoObj = new Twit(twitTwo);
}

function Twit(screen_name) {
  this.screen_name = screen_name;
}

function getTweetValues() {
  twitOneObj.favourites = 4050;
  twitOneObj.reTweets = 1320 * 1.5;
  twitTwoObj.favourites = 3600;
  twitTwoObj.reTweets = 1600 * 1.5;
}

function getWarScore() {
  twitOneObj.warScore = twitOneObj.favourites + twitOneObj.reTweets;
  twitTwoObj.warScore = twitTwoObj.favourites + twitTwoObj.reTweets;
}

function renderResults() {
  form.removeChild(button);
  display.setAttribute('class','fight');
  inputTwitOne.setAttribute('class', 'active');
  inputTwitTwo.setAttribute('class', 'active');
  inputTwitOne.disable = true;
  inputTwitOne.disable = true;
  resultsOne.setAttribute('class', 'show');
  resultsTwo.setAttribute('class', 'show');
  resultsKey.setAttribute('class', 'key_show');
  renderAnimate();
}

function renderAnimate() {
  var listOne = document.getElementById('list_one');
  var listTwo = document.getElementById('list_two');
  // var listKey = document.getElementById('list_key');

  var favouritesOne = document.createElement('li');
  var favouritesTwo = document.createElement('li');

  favouritesOne.innerHTML = twitOneObj.favourites;
  favouritesTwo.innerHTML = twitTwoObj.favourites;

  listOne.appendChild(favouritesOne);
  listTwo.appendChild(favouritesTwo);

  if (twitOneObj.favourites > twitTwoObj.favourites) {
    favouritesOne.setAttribute('class', 'winner');
    favouritesTwo.setAttribute('class', 'loser');
  } else {
    favouritesOne.setAttribute('class', 'loser');
    favouritesTwo.setAttribute('class', 'winner');
  }

  var reTweetsOne = document.createElement('li');
  var reTweetsTwo = document.createElement('li');

  reTweetsOne.innerHTML = twitOneObj.reTweets;
  reTweetsTwo.innerHTML = twitTwoObj.reTweets;

  listOne.appendChild(reTweetsOne);
  listTwo.appendChild(reTweetsTwo);

  if (twitOneObj.reTweets > twitTwoObj.reTweets) {
    reTweetsOne.setAttribute('class', 'winner');
    reTweetsTwo.setAttribute('class', 'loser');
  } else {
    reTweetsOne.setAttribute('class', 'loser');
    reTweetsTwo.setAttribute('class', 'winner');
  }

}
