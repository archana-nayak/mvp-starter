var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// vadr router = express.Router();
var db = require('../database-mysql/index.js');
var helpers = require('../helpers/getGPlaces.js');
let data = require('../data-files/cafes.json');
var Promise = require('bluebird');
const fs = require('fs');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

let map = new Map();

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());


// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/cafes', function (req, res) {
  var username = req.body.username;
  // [username]
  db.selectAll([username], function(err, data) {
    if(err) {
      // res.status(500);
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

app.post('/cafes', function(req, res) {
  // console.log('request ', req);
  var zipcode = req.body.zipcode;
  console.log('zipcode ', zipcode);
  if (!map.has(zipcode)) {
    console.log('map.get(zipcode) ', map.get(zipcode));
    map.set(zipcode, true);
  
    readFile(function(cafeLists) {
      createParams(cafeLists, zipcode, function(insertValueParams) {
        db.addCafe(insertValueParams, function(err, data) {
          if (err) {
            console.log(err);
          }
        });  
      });    
    });
  }  
  res.status(201).json({zipcode:zipcode});
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

var readFile = (callback) => {
  let cafeLocations = data.results;  
  // console.log(cafeLocations);  
  console.log('lat ', cafeLocations[0].geometry.location.lat);
  callback(cafeLocations);
 
};

var createParams = (cafeLists, zipcode, callback) => {
  for( var i = 0; i < 3; i++) {
    var store_name = cafeLists[i].name;
    var place_id = cafeLists[i].place_id;
  
    //add zip_code from the post request itself
    //remove location_id from cafes tables and eliminate the location table
    var location_id = 1; //harcoded for now, remove later
    var icon_url = cafeLists[i].icon;
    var openinghours_open_now = cafeLists[i].opening_hours.open_now;
    var photos_height = cafeLists[i].photos[0].height;
    var photos_width = cafeLists[i].photos[0].width;
    var photos_html_attributions = cafeLists[i].photos[0].html_attributions[0];
    var vicinity = cafeLists[i].vicinity;
    var lat = cafeLists[i].geometry.location.lat;
    var lng = cafeLists[i].geometry.location.lng;
    var price_level = cafeLists[i].price_level;
    var rating = cafeLists[i].rating;
    
    // (store_name, place_id, zipcode, location_id, icon, openinghours_open_now, \
    //   photos_height, photos_width, photos_html_attributions, vicinity, lat, lng, price_level, rating)

    //create the params array to insert record
    var insertValueParams = [store_name, place_id, zipcode, location_id, icon_url, 
      openinghours_open_now, photos_height, photos_width, photos_html_attributions, vicinity, 
      lat, lng, price_level,rating];
      console.log('params for insert ', insertValueParams);
      callback(insertValueParams);
  }    

};

  // helpers.getLocatorsFromGoogleMaps(zipcode)
  // .then((location) => {
  //   console.log('Response from gmap ', location);
  //   //TODO: insert values into location table
  //   //take lat , long values and call getLocatorsFromGoogle
  //   console.log('typeof location ', typeof location);
    
  //   var locationObj = JSON.parse(location).results;
  //   console.log(locationObj);
  //   // var locator = locationObj.geometry.location;
  //   // var lng = locator.lng;
  //   // var lat = locator.lat;
  //   // var place_id = locationObj.place_id;
  //   // var formattedAddress = locationObj.formatted_address;
  //   // var locationParams = [zipcode, lat, lng, formattedAddress, place_id];
  //   //Insert into location table
  //   // helpers.getCafesFromGooglePlaces(lat, lng)
  //   // .then((cafes) => {
  //   //   console.log('cafes  ', cafes );
  //   //   // cafes.forEach((cafe) => {

  //   //   // });
  //   // })
  //   // .catch((err) => {
  //   //   console.log(error);
  //   // });
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

  // res.status(201);
  // res.json(req.body);
// })