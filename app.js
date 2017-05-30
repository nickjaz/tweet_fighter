'use strict';

var formElement = document.getElementById('form');
var twitOne = '';
var twitTwo = '';
var twitOneObj;
var twitTwoObj;
var returnedTweets = JSON.parse(tweets);
var favouritePoints = 1;
var reTweetPoints = 1.5;
var activeTweets = [];

function submitSearch(event){
  event.preventDefault();

  twitOne = event.target.twitOne.value.toUpperCase();
  twitOne = twitOne.replace('@','');
  twitTwo = event.target.twitTwo.value.toUpperCase();
  twitTwo = twitTwo.replace('@','');
  assignTwits(twitOne, twitTwo);
  sortTweets(returnedTweets, twitOne, twitTwo);
  results();
  formElement.reset();
}

formElement.addEventListener('submit', submitSearch);

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
      twitOneObj.tweets.push(returnedTweets[i]);
    } else if (returnedTweets[i].user.screen_name.toUpperCase() === twitTwo){
      twitTwoObj.tweets.push(returnedTweets[i]);
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
    legend: [1, 2, 5, 8, 10],
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
      renderResults();
      return date;
    },
  });
}

function findWinner(){
  var fightResults = [];
  if (twitOneObj.warScore > twitTwoObj.warScore){
    fightResults = [twitOneObj.screen_name, twitOneObj.warScore, twitTwoObj.screen_name, twitTwoObj.warScore];
  } else if (twitOneObj.warScore < twitTwoObj.warScore){
    fightResults = [twitTwoObj.screen_name, twitTwoObj.warScore, twitOneObj.screen_name, twitOneObj.warScore];
  } else {
    console.log('findWinner Error');
  }
  return fightResults;
}

function renderResults(){
  var resultsArray = findWinner();
  var twitOneBox = document.getElementById('twit-one');
  var twitTwoBox = document.getElementById('twit-two');
  if (resultsArray[0] === twitOneObj.screen_name){
    twitOneBox.innerHTML = '<li>Winner!</li><li>War Score: ' + twitOneObj.warScore + '</li>';
    twitTwoBox.innerHTML = '<li>Loser!</li><li>War Score: ' + twitTwoObj.warScore + '</li>';
  } else if (resultsArray[0] === twitTwoObj.screen_name){
    twitOneBox.innerHTML = '<li>Loser!</li><li>War Score: ' + twitOneObj.warScore + '</li>';
    twitTwoBox.innerHTML = '<li>Winner!</li><li>War Score: ' + twitTwoObj.warScore + '</li>';
  } else {
    console.log('renderResults Error');
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
  makeHeatMap();
}
