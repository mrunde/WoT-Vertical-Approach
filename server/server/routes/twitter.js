// Load the application's configuration
var config = require('./../config');

// Required modules
var Twitter = require('twitter');

// Set up the express router

// Define new Client who sends new Tweets
var client = new Twitter({
  consumer_key: config.twitterConsumerKey,
  consumer_secret: config.twitterConsumerSecret,
  access_token_key: config.twitterAccessTokenKey,
  access_token_secret: config.twitteraccessTokenSecret
});

// --------------------------------------------------
// POST
// --------------------------------------------------


function newStatusTwitter(content) {
	client.post('statuses/update', {status: 'My First Tweet'},  function(error, tweet, response){
			if(error) 
				throw console.log(error);
			console.log(tweet);  // Tweet body. 
			console.log(response);  // Raw response object. 
	});
}
