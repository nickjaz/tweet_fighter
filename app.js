'use strict';

var formElement = document.getElementById('form');
var twitOne = '';
var twitTwo = '';
var twitOneObj;
var twitTwoObj;

function submitSearch(event){
  event.preventDefault();

  twitOne = event.target.twitOne.value;
  twitOne = twitOne.replace('@','');
  twitTwo = event.target.twitTwo.value;
  twitTwo = twitTwo.replace('@','');
  assignTwits(twitOne, twitTwo);
  formElement.reset();
}

formElement.addEventListener('submit', submitSearch);

var returnedTweets = JSON.parse(tweets);

function Twit(screen_name){
  this.screen_name = screen_name;
  this.tweets = [];
}

Twit.prototype.sortTweets = function(returnedTweets, twitOne, twitTwo){
  for (var i=0; i<returnedTweets.length; i++){
    if (returnedTweets[i].user.screen_name === twitOne){
      twitOneObj.tweets.push(returnedTweets[i]);
    } else if (returnedTweets[i].user.screen_name === twitTwo){
      twitTwoObj.tweets.push(returnedTweets[i]);
    } else {
      console.log('Error!!!!!!');
    }
  }
};

function assignTwits(twitOne, twitTwo){
  twitOneObj = new Twit(twitOne);
  twitTwoObj = new Twit(twitTwo);
}
