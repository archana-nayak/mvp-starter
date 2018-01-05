var request = require('request');
var config = require('../config.js');
var Promise = require('bluebird');

//returns a promise object
//get lat, lng values for a given zip code
module.exports.getLocatorsFromGoogleMaps = (zipcode) => {
  var options = {
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode,
    headers: {
      'User-Agent': 'request',
      'key': 'AIzaSyDuNZCpRED761035Zh2hQOyP38B2Pb_tvQ'//config.API_KEY
    }
  };
    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(body);
      });
    }); 
  
};

  //given the lat , lng ; query the google places API
  //to get the 10 nearby cafes at a 500 metres radius


module.exports.getCafesFromGooglePlaces = (lat, lng) => {
    var options = {
      url: 'https://maps.googleapis.com/maps/api/place/details/json?location=' + lat + ',' +
      lng + '&radius=500&type=cafe&key=AIzaSyDuNZCpRED761035Zh2hQOyP38B2Pb_tvQ',
      headers: {
        'User-Agent': 'request',
        // 'key': config.API_KEY,
        'maxResults': '10'
      }
    };
    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
         if (err) {
           return reject(err);
         }
         return resolve(JSON.parse(body));
      });
    });
      

  };
  // https://maps.googleapis.com/maps/api/place/details/json?
  // place_id=ChIJezBipoOAhYARUPnBLQwBmf0&type=cafe&
  // radius=9656.06&key=AIzaSyDuNZCpRED761035Zh2hQOyP38B2Pb_tvQ


  // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7785189,-122.4056395&
  // radius=500&type=cafe&key=AIzaSyDuNZCpRED761035Zh2hQOyP38B2Pb_tvQ
  