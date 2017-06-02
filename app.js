'use strict';

//global variables

var form = document.getElementById('form'); //changed the name of this variable to match mine
var twitOne = '';
var twitTwo = '';
var twitOneObj;
var twitTwoObj;
var returnedTweets = JSON.parse(tweets);
var favouritePoints = 1;
var reTweetPoints = 1.5;
var activeTweets = [];

//user click
function submitSearch(event){
  event.preventDefault();

  twitOne = event.target.twitOne.value.toUpperCase();
  twitOne = twitOne.replace('@','');
  twitTwo = event.target.twitTwo.value.toUpperCase();
  twitTwo = twitTwo.replace('@','');
  assignTwits(twitOne, twitTwo);
  sortTweets(returnedTweets, twitOne, twitTwo);
  results();
  // form.reset();
}

form.addEventListener('submit', submitSearch);

Twit.prototype.calcTweetScores = function(){
  for (var i=0; i<this.tweets.length; i++){
    var totTweetFavScore = favouritePoints * this.tweets[i].favourites_count;
    var totTweetRTScore = reTweetPoints * this.tweets[i].retweet_count;
    this.tweets[i].faveScore = totTweetFavScore;
    this.tweets[i].rTScore = totTweetRTScore;
    this.tweets[i].tweetWarScore = totTweetRTScore + totTweetFavScore;
  }
};

Twit.prototype.convertDates = function(){
  for (var i=0; i<this.tweets.length; i++){
    var twitDate = this.tweets[i].created_at;
    var twitDateSplit = twitDate.split(' ');
    var jsDate = twitDateSplit[0] + ' ' + twitDateSplit[1] + ' ' + twitDateSplit[2] + ' ' + twitDateSplit[5] + ' ' + twitDateSplit[3] + ' GMT' + twitDateSplit[4];
    console.log(jsDate);
    this.tweets[i].datetimesent = new Date(jsDate);
    console.log(this.tweets[i].datetimesent);
  }
};

Twit.prototype.setTimestamp = function(){
  for (var i=0; i<this.tweets.length; i++){
    var twitDate = this.tweets[i].datetimesent;
    this.tweets[i].timestamp = twitDate.getTime();
  }
};

Twit.prototype.sortDates = function(){
  this.tweets.sort(function(a,b){
    return new Date(a.datetimesent) - new Date(b.datetimesent);
  });
};

Twit.prototype.tweetsByMonth = function(date){
  var clickedDate = date.toString().split(' ');
  for (var i=0; i<this.tweets.length; i){
    var tweetDate = this.tweets[i].datetimesent.toString().split(' ');
    if (clickedDate[1] === tweetDate[1] && clickedDate[3] === tweetDate[3]){
      console.log('Do not remove');
      i++;
    } else {
      console.log(i);
      this.tweets.splice(i, 1);
    }
  }
};

Twit.prototype.totalsForWar = function(){
  var totFavourites = 0;
  var totReTweets = 0;
  var totWarScore = 0;
  for (var i=0; i<this.tweets.length; i++){
    totFavourites = totFavourites + this.tweets[i].favourites_count;
    totReTweets = totReTweets + this.tweets[i].retweet_count;
    totWarScore = totWarScore + this.tweets[i].tweetWarScore;
  }
  this.favourites = totFavourites;
  this.reTweets = totReTweets;
  this.warScore = totWarScore;
};

function Twit(screen_name){
  this.screen_name = screen_name.toUpperCase();
  this.tweets = [];
}

function sortTweets(returnedTweets, twitOne, twitTwo){
  for (var i=0; i<returnedTweets.length; i++){
    if (returnedTweets[i].user.screen_name.toUpperCase() === twitOne){
      for (var j=0; j<returnedTweets[i].entities.user_mentions.length; j++){
        if (returnedTweets[i].entities.user_mentions[j].screen_name.toUpperCase() === twitTwo){
          twitOneObj.tweets.push(returnedTweets[i]);
          console.log('Assigned');
        } else {
          console.log('Not assigned');
        }
      }
    } else if (returnedTweets[i].user.screen_name.toUpperCase() === twitTwo){
      for (var k=0; k<returnedTweets[i].entities.user_mentions.length; k++){
        if (returnedTweets[i].entities.user_mentions[k].screen_name.toUpperCase() === twitOne){
          twitTwoObj.tweets.push(returnedTweets[i]);
          console.log('Assigned');
        } else {
          console.log('Not assigned');
        }
      }
    } else {
      console.log('Not assigned');
    }
  }
}

function assignTwits(twitOne, twitTwo){
  twitOneObj = new Twit(twitOne);
  twitTwoObj = new Twit(twitTwo);
}

function setActiveTweets(){
  activeTweets = twitOneObj.tweets.concat(twitTwoObj.tweets);
}

function sortActiveTweets(){
  activeTweets.sort(function(a,b){
    return new Date(a.datetimesent) - new Date(b.datetimesent);
  });
}

function calData(){
  var calData = {};
  for (var i=0; i<activeTweets.length; i++){
    var calTimestamp = Math.floor(activeTweets[i].timestamp / 1000);
    calData[calTimestamp] = 1;
  }
  return calData;
}

//http://cal-heatmap.com/
function makeHeatMap(){
  var cal = new CalHeatMap();
  cal.init({
    itemSelector: '#calendar',
    domain: 'year',
    subdomain: 'month',
    subDomainTextFormat: '%m',
    cellSize: 20,
    start: activeTweets[0].datetimesent,
    range: 4,
    legend: [1, 2, 4, 8],
    colLimit: 3,
    label: {
      position: 'top'
    },
    data: calData(),
    onClick: function(date) {
      console.log(date);
      twitOneObj.tweetsByMonth(date);
      twitTwoObj.tweetsByMonth(date);
      twitOneObj.totalsForWar();
      twitTwoObj.totalsForWar();
      tweetCal.removeChild(calendar);
      tweetCal.removeChild(calTitle);
      renderResults();
      return date;
    },
  });
}

function results(){
  twitOneObj.calcTweetScores();
  twitTwoObj.calcTweetScores();
  twitOneObj.convertDates();
  twitTwoObj.convertDates();
  twitOneObj.setTimestamp();
  twitTwoObj.setTimestamp();
  setActiveTweets();
  sortActiveTweets();
  expandAndCenter();
  setTimeout(makeHeatMap, 350);
}

//Start of the render function operations
//render gloabal variables
var display = document.getElementById('display');
//redundant variable below
// var form = document.getElementById('form');
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
var favLegend = document.getElementById('favourites_legend');
var reTweetsLegend = document.getElementById('retweets_legend');
var warLegend = document.getElementById('warscore_legend');
var displayBox = document.getElementById('display_block');
var tweetCal = document.getElementById('tweet_cal');
var calTitle = document.getElementById('cal_title');
var calendar = document.getElementById('calendar');

//Encapsulating the procedural rendering functions
function renderResults() {
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
  favouritesImg.setAttribute('src', 'TFAssets/favourites.png');
  favLegend.setAttribute('class', 'legend');
  favLegend.innerHTML = 'favourites';
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
  reTweetsImg.setAttribute('src', 'TFAssets/retweet.png');
  reTweetsLegend.setAttribute('class', 'legend');
  reTweetsLegend.innerHTML = 'retweet';
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
  warScoreImg.setAttribute('src', 'TFAssets/warscore.png');
  warLegend.setAttribute('class', 'legend');
  warLegend.innerHTML = 'warscore';
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

var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
var evalKonami = [];

document.addEventListener('keydown', checkKonami);

function checkKonami () {
  var keyPushed = event.keyCode;
  console.log('key is pushed');
  console.log(keyPushed);
  evalKonami.push(event.keyCode);
  console.log('key was put in evalKonami array');
  var lastTen = evalKonami.length - 10;
  console.log(lastTen);
  if (lastTen > 0) {
    evalKonami = evalKonami.splice(lastTen, 10);
  }
  if (evalKonami.toString() === konamiCode.toString()) {
    var form = document.getElementById('form');
    console.log('does it match');
    var sprite = document.createElement('img');
    sprite.src = './imgs/ChunLiThrow_1.gif';
    sprite.id = 'chunli';
    form.appendChild(sprite);
    sprite = document.createElement('img');
    sprite.src = './imgs/knockout.gif';
    sprite.id = 'knockout';
    form.appendChild(sprite);
    sprite = document.createElement('img');
    sprite.src = './imgs/facekick.gif';
    sprite.id = 'facekick';
    form.appendChild(sprite);
    sprite = document.createElement('img');
    sprite.src = './imgs/carpunch.gif';
    sprite.id = 'carpunch';
    form.appendChild(sprite);
    sprite = document.getElementById('facekick');
  }
}
