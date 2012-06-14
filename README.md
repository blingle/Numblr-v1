Numblr-v1
=========

  Author:  Brent Lingle
  
  Contact: lingle.brent@gmail.com
  
  Version: 1.0
  
  Notes:   If you find any bugs, have questions or concerns, please
           feel free to e-mail me!

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
 
  You'll need 1 thing:
     1. Oauth key consumer key (api_key), provided by Tumblr

  Visit the README.md file on github for the Documentation.

  *** DISCLAIMER ***  THIS SOFTWARE IS 'AS-IS' 
  
  
Methods

//avatar method

    numblr.avatar(hostName, size, cb)
  
    hostName: (required) The host name of the tumblr blog.
      ex. "brentisyourfriend".tumblr.com'
      brentisyourfried is the host name

    size: (required) The size in pixels of the image.
      Tumblr accepts these sizes 16, 24, 30, 40, 48, 
      64, 96, 128, 512
    
    cb: (required) A callback function that is called after
      the http request has been made to tumblr's api.  Will
      return the data or an error.
    
    //return object
    
      This method returns the avatar url as a JSON object.
        jsonObj.response.avatar_url

//info method

    numblr.info(hostName, apiKey, cb)

    hostName: (required) The host name of the tumblr blog.
      ex. "brentisyourfriend".tumblr.com'
      brentisyourfried is the host name
  
    apiKey: (required) An Oauth key provided by tumblr.
      You can visit tumblr and register for an Oauth key.
      It takes only moments to register an application,
      which is a host name.
      
    cb: (required) A callback function that is called after
      the http request has been made to tumblr's api.  Will
      return the data or an error.
      
    //return object
    
      This method returns the blog info as a json object.
        jsonObj.response.blog.title //blog title
        jsonObj.response.blog.posts //total # of posts
        jsonObj.response.blog.name //name of blog
        jsonObj.response.blog.url //url of blog
        jsonObj.response.blog.updated //last updated
        jsonObj.response.blog.description //blog description
        jsonObj.response.blog.ask //boolean
        jsonObj.response.blog.ask_anon //boolean
        jsonObj.response.blog.likes //# of likes
      
//posts method

    numblr.posts(hostName, apiKey, limit, offset, cb)
  
    hostName: (required) The host name of the tumblr blog.
      ex. "brentisyourfriend".tumblr.com'
      brentisyourfried is the host name

    apiKey: (required) An Oauth key provided by tumblr.
      You can visit tumblr and register for an Oauth key.
      It takes only moments to register an application,
      which is a host name.
      
    limit: (required) The total number of posts to retrieve.
      The max limit is 20 posts at one time.
      
    offset: (required) The posts to start with.  0 is the
      newest post.

    cb: (required) A callback function that is called after
      the http request has been made to tumblr's api.  Will
      return the data or an error.

      //return object

        This method returns the blog posts as a json object.
          This is a lengthy object, so I recommend looking 
          at the tumblr documentation for a more detailed
          description of this JSON object.
          http://www.tumblr.com/docs/en/api/v2
          
          
// Example on how to use this module

    var numblr = require('numblr');

    numblr.avatar('#someHost-Name', 512, function(err, data) {
        if ( data ) {
            //returned callback data
        } else {
            //error
        }
    });
          
          
          
For more information please visit:
http://www.tumblr.com/docs/en/api/v2
          
-or-

contact me:

Brent Lingle
lingle.brent@gmail.com
(changes and collaboration are welcome!)
