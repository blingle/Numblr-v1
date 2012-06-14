/*
  Author:  Brent Lingle
  Contact: lingle.brent@gmail.com
  Version: 1.0
  Notes:   If you find any bugs, have questions or concerns, please
           feel free to e-mail me!

  *****************************************************************
  This module provides an easy way to interact with tumblr's API 
  using nodejs.  It is based on tumblr's API Version 2.  You may
  have to adjust the file path, so that the 'http' module loads
  properly.

  This module provides basic functionality for requests to tumblr.  
  You can retreive the Avatar url, the blog info, and blog posts 
  in group or single format.

  MIT Licensed
  Tumblr API version: v2
  Node.js Version: v0.6.17
 
  You'll need 1 things:
     1. Oauth key consumer key (api_key), provided by Tumblr

  Visit the README.md file on github for the Documentation.

  *** DISCLAIMER ***  THIS SOFTWARE IS 'AS-IS' 

  *****************************************************************
*/

//required modules
var http = require('http');

//Returns the url of the tumblr Avatar.
//The size must be ONE number, 16, 24, 30, 40, 48, 64
//96, 128, 512 and is in pixels.
exports.avatar = function(hostName, size, cb) {
	
	var obj = '';
	
	//if size isn't defined, or the inncorect type
	//it defaults to 64 pixels
	size = parseInt(size);
	if (typeof size != "number") size = 64;
	
	
	//create an options for http.get()
	var options = {
	  host: 'api.tumblr.com',
	  port: 80,
	  path: '/v2/blog/' + hostName + 
	    '.tumblr.com/avatar/' + size 
	};
	
	//make the request to tumblr
	var req = http.get(options, function(res) {
	  var data = '';
	  
	  //.on() event handler is used
	  //to handle the response data
	
	  //collect data
	  res.on('data', function(chunk) {
		  data += chunk;
	  });	
    
    //parse data	
	  res.on('end', function(err) {
		  try {
			  obj = JSON.parse(data);
			  cb(null, obj);
		  } catch (err) {
			  cb(err);
		  }
	  });
	});
};

//This method returns the blog title, total number of posts,
//the name of the blog, the time of the most recent
//post in second since epoch, the blog description,
//wether the blog allows questions, wether the blog
//allows anonymous questions, and the number of 
//likes for this user.  Return a JSON object.  
exports.info = function(hostName, apiKey, cb) {
  
  var obj = '';
  
  //if no api_key is provided
  //an error is returned
  if (!apiKey) {
    cb(err);
  }
  
  //options for http.get()
  var options = {
    host: 'api.tumblr.com',
    port: 80,
    path: '/v2/blog/' + hostName + 
        '.tumblr.com/info?api_key=' + apiKey 
  };

  //make the request to tumblr
  var req = http.get(options, function(res) {
	 
    var data = '';
	
	  //.on() event handler is used
	  //to handle the response data
	
    //collect the data
    res.on('data', function(chunk) {
      data += chunk;
    });
  
    //parse the data
	  res.on('end', function(err) {
		  try {
			  obj = JSON.parse(data);
			  //console.log('The data was parsed');
			  cb(null, obj);
		  } catch (err) {
			  //console.log('err0r');
			  cb(err);
		  }
    });
  });
};

//Returns the specified number of posts, up to 20 and the specified
//post to start with.  Tumblr lists the first post with an Id of 0.
//Every subsequent post is in ascending order. By specifying an offset
//that is the first post that will be selected.  Each post will be
//chosen in numerical ascending order.  Return a JSON object.
exports.posts = function(hostName, apiKey, limit, offset, cb){
 
  var obj = '';

  //check the api_key
  if ( !apiKey ) {
    cb(err);
  }

  //check limit type
  limit = parseInt(limit);
  if ( typeof limit !== "number" ) limit = 20;
   
  //check offset type
  offset = parseInt(offset);
  if ( typeof offset !== "number" ) offset = 0;  
  
  //options for http.get()
  var options = {
    host: 'api.tumblr.com',
    port: 80,
    path: '/v2/blog/' + hostName + 
        '.tumblr.com/posts?api_key=' + apiKey +
        '&' + 'limit=' + limit  + '&offset=' + 
        offset,
  };
  
  //Check the path that is being sent to tumblr
  //console.log(options.path);

  //make the request to tumblr
  var req = http.get(options, function(res) {
	 
    var data = '';
	
	  //.on() event handler is used
	  //to handle the response data
	
    //collect the data
    res.on('data', function(chunk) {
      data += chunk;
    });
  
    //parse the data
	  res.on('end', function(err) {
		  try {
			  obj = JSON.parse(data);
			  cb(null, obj);
		  } catch (err) {
			  cb(err);
		  }
    });
  });	
};
