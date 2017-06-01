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

var tweetsCalSort = function (date) {
  var clickedDate = date.toString().split(' ');
  for (var i = 0; i < activeTweets.length; i){
    var tweetDate = activeTweets[i].datetimesent.toString().split(' ');
    if (clickedDate[1] === tweetDate[1] && clickedDate[3] === tweetDate[3]){
      i++;
    } else {
      activeTweets.splice(i, 1);
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

//Konami code
var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
var evalKonami = [];

document.addEventListener('keydown', checkKonami);

function checkKonami () {
  var keyPushed = event.keyCode;
  console.log('key is pushed');
  console.log(keyPushed);
  evalKonami.push(event.keyCode);
  console.log('key was put in evalKonami array');
  if (evalKonami == konamiCode) {
    console.log('does it match');
    var sprite = document.createElement('img');
    sprite.src = './imgs/ChunLiThrow_1.gif';
    document.body.appendChild(sprite);
  }
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
      tweetsCalSort(date);
      twitOneObj.totalsForWar();
      twitTwoObj.totalsForWar();
      form.removeChild(calendar);
      form.removeChild(calTitle);
      renderTweets();
      renderResults();
      return date;
    },
  });
}


function renderTweets() {
  for (var i = 0; i < activeTweets.length; i++) {
    var tweetSpans = document.createElement('span');
    tweetSpans.innerHTML = activeTweets[i].text;
    var divTweet = document.getElementById('allTheTweets');
    divTweet.appendChild(tweetSpans);
  }
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

//possibly redundant code below

// function findWinner(){
//   var fightResults = [];
//   if (twitOneObj.warScore > twitTwoObj.warScore){
//     fightResults = [twitOneObj.screen_name, twitOneObj.warScore, twitTwoObj.screen_name, twitTwoObj.warScore];
//   } else if (twitOneObj.warScore < twitTwoObj.warScore){
//     fightResults = [twitTwoObj.screen_name, twitTwoObj.warScore, twitOneObj.screen_name, twitOneObj.warScore];
//   } else {
//     console.log('findWinner Error');
//   }
//   return fightResults;
// }

// function renderResults(){
//   var resultsArray = findWinner();
//   var twitOneBox = document.getElementById('twit-one');
//   var twitTwoBox = document.getElementById('twit-two');
//   if (resultsArray[0] === twitOneObj.screen_name){
//     twitOneBox.innerHTML = '<li>Winner!</li><li>War Score: ' + twitOneObj.warScore + '</li>';
//     twitTwoBox.innerHTML = '<li>Loser!</li><li>War Score: ' + twitTwoObj.warScore + '</li>';
//   } else if (resultsArray[0] === twitTwoObj.screen_name){
//     twitOneBox.innerHTML = '<li>Loser!</li><li>War Score: ' + twitOneObj.warScore + '</li>';
//     twitTwoBox.innerHTML = '<li>Winner!</li><li>War Score: ' + twitTwoObj.warScore + '</li>';
//   } else {
//     console.log('renderResults Error');
//   }
// }


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
var displayBox = document.getElementById('display_block');
var calTitle = document.getElementById('cal_title');
var calendar = document.getElementById('calendar');

//Encapsulating the procedural rendering functions
function renderResults() {
  displayBox.setAttribute('class', 'show');
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
  // display.setAttribute('class','expand');
  inputTwitOne.setAttribute('class', 'center');
  inputTwitTwo.setAttribute('class', 'center');
  inputTwitOne.disable = true;
  inputTwitOne.disable = true;
}

//Displays the data, all functions below part of the render results func ^ above ^
function renderFavourites() {
  favouritesOne.innerHTML = twitOneObj.favourites; //replace this with favourites method
  favouritesTwo.innerHTML = twitTwoObj.favourites;
  favouritesImg.setAttribute('class', 'icon');
  favouritesImg.setAttribute('src', 'https://image.flaticon.com/icons/png/128/148/148836.png'); //will store in img directory fred is building
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
  reTweetsImg.setAttribute('src', 'https://maxcdn.icons8.com/Share/icon/Messaging//retweet1600.png'); //will store in img directory fred is building
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
  warScoreImg.setAttribute('src', './imgs/ChunLiThrow_1'); //will store in img directory fred is building
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
