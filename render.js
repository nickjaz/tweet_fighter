
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
var displayBlock = document.getElementsByTagName('div')
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
  displayBlock.setAttribute('class', 'show');
  renderAnimate();
}

function renderAnimate() {


  if (twitOneObj.favourites > twitTwoObj.favourites) {
    favouritesOne.setAttribute('class', 'winner');
    favouritesTwo.setAttribute('class', 'loser');
  } else {
    favouritesOne.setAttribute('class', 'loser');
    favouritesTwo.setAttribute('class', 'winner');
  }


  if (twitOneObj.reTweets > twitTwoObj.reTweets) {
    reTweetsOne.setAttribute('class', 'winner');
    reTweetsTwo.setAttribute('class', 'loser');
  } else {
    reTweetsOne.setAttribute('class', 'loser');
    reTweetsTwo.setAttribute('class', 'winner');
  }

}
