
var display = document.getElementById('display');
var form = document.getElementById('form');
var button = document.getElementById('btn');
// var twitOne = document.getElementById('twitOne');
// var twitTwo = document.getElementById('twitTwo');
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
  twitOneObj.favourites + twitOneObj.reTweets = twitOneObj.warScore;
  twitTwoObj.favourites + twitTwoObj.reTweets = twitTwoObj.warScore;
}
