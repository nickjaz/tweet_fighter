'use strict';

var formElement = document.getElementById('form');
var twitOne = '';
var twitTwo = '';
var twitOneObj;
var twitTwoObj;
var returnedTweets = JSON.parse(tweets);
var favouritePoints = 1;
var reTweetPoints = 1.5;

function submitSearch(event){
  event.preventDefault();

  twitOne = event.target.twitOne.value;
  twitOne = twitOne.replace('@','');
  twitTwo = event.target.twitTwo.value;
  twitTwo = twitTwo.replace('@','');
  assignTwits(twitOne, twitTwo);
  sortTweets(returnedTweets, twitOne, twitTwo);
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

function Twit(screen_name){
  this.screen_name = screen_name;
  this.tweets = [];
}

function sortTweets(returnedTweets, twitOne, twitTwo){
  for (var i=0; i<returnedTweets.length; i++){
    if (returnedTweets[i].user.screen_name === twitOne){
      twitOneObj.tweets.push(returnedTweets[i]);
    } else if (returnedTweets[i].user.screen_name === twitTwo){
      twitTwoObj.tweets.push(returnedTweets[i]);
    } else {
      console.log('Error!!!!!!');
    }
  }
}

function assignTwits(twitOne, twitTwo){
  twitOneObj = new Twit(twitOne);
  twitTwoObj = new Twit(twitTwo);
}
