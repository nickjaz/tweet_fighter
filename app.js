'use strict';

var formElement = document.getElementById('form');

function submitSearch(event){
  event.preventDefault();

  var twitOne = event.target.twitOne.value;
  var twitTwo = event.target.twitTwo.value;
  formElement.reset();
}

formElement.addEventListener('submit', submitSearch);

var returnedTweets = JSON.parse(tweets);
console.log(returnedTweets);
