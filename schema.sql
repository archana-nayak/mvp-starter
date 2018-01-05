-- DROP DATABASE IF EXISTS stores;

CREATE DATABASE cafesdb;

USE cafesdb;

CREATE TABLE location (
  id int NOT NULL AUTO_INCREMENT,
  zipcode varchar(8) NOT NULL,
  lat varchar(15) NOT NULL,
  lng varchar(15) NOT NULL,
  location_name varchar(200) NOT NULL,
  loc_city varchar(30),
  loc_state varchar(30),
  gmap_id varchar(60),
  place_id varchar(40),
  PRIMARY KEY (id)
);

CREATE TABLE cafes (
  id int NOT NULL AUTO_INCREMENT,
  store_name varchar(80) NOT NULL,
  place_id varchar(80) NOT NULL,
  zipcode varchar(8),
  location_id int NOT NULL, 
  icon_url varchar(256),
  openinghours_open_now varchar(8),
  photos_height varchar(10),
  photos_width varchar(10),
  photos_html_attributions varchar(100),
  vicinity varchar(125),
  lat varchar(40) NOT NULL,
  lng varchar(40) NOT NULL,
  price_level varchar(5),
  rating varchar(5),
  PRIMARY KEY (id),
  FOREIGN KEY(location_id) REFERENCES location(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


 INSERT INTO location (zipcode, lat, lng, location_name, loc_city, loc_state, gmap_id, place_id)
 VALUES ('95158', '37.7785189', '-122.4056395', 'SoMa, San Francisco, CA, United States', 'San Francisco','CA',
  '9abee36e204b62e2f89bf8f146535492846c9ed9', 'ChIJezBipoOAhYARUPnBLQwBmf0');

INSERT INTO cafes (store_name,place_id,zipcode,location_id,icon_url,openinghours_open_now,photos_height,
photos_width,photos_html_attributions,vicinity,lat,lng,price_level,rating) 
values ('Cowgirl Creamery Sidekick Cafe & Milk Bar','ChIJeTojGF-AhYARE7vVjdf5r-k',NULL,1,
'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','true','3036','4048',
'<a href=\"https://maps.google.com/maps/contrib/103901341289249178418/photos\">Steve Pierre</a>',
'One Ferry Building, #19, San Francisco',
'37.79541800000001', '-122.393194','1','4.1');

INSERT INTO cafes (store_name,place_id,zipcode,location_id,icon_url,openinghours_open_now,photos_height,
photos_width,photos_html_attributions,vicinity,lat,lng,price_level,rating) 
values ('Cowgirl Creamery Sidekick Cafe & Milk Bar','ChIJeTojGF-AhYARE7vVjdf5r-k',NULL,1,
'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','true','3036','4048',
'<a href=\"https://maps.google.com/maps/contrib/103901341289249178418/photos\">Steve Pierre</a>',
'One Ferry Building, #19, San Francisco',
'37.79541800000001', '-122.393194','1','4.1');
