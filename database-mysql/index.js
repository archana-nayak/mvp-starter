var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cafesdb'
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Connected to cafesdb database');
});

var selectAll = function(params, callback) {
  connection.query('SELECT * FROM cafes where zipcode = ?)', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


var addCafe = (params, callback) => {
  var query = 'INSERT INTO cafes (store_name, place_id, zipcode, location_id, icon_url, openinghours_open_now, \
  photos_height, photos_width, photos_html_attributions, vicinity, lat, lng, price_level, rating) \
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  connection.query(query, params, (err, results) => {
    if (err) {
      console.log(err);
      throw err;
    }
    callback(err, results);
  });
}

module.exports.selectAll = selectAll;
module.exports.addCafe = addCafe;





// place_id varchar(40) NOT NULL,
// zipcode int NOT NULl,
// location_id int NOT NULL, 
// icon varchar(100) NOT NULL,
// openinghours_open_now Boolean,
// photos_height: int,
// photos_width: int,
// photos_html_attributions: varchar(100),
// vicinity varchar(30),
// lat DECIMAL(10,8) NOT NULL,
// lng DECIMAL (11, 8) NOT NULL,
// price_level varchar(5),
// rating varchar(5),









//This is for the add an array of cafes for 
//a given zipcode
// var mysql = require('node-mysql');
// var conn = mysql.createConnection({
//     ...
// });

// var sql = "INSERT INTO Test (name, email, n) VALUES ?";
// var values = [
//     ['demian', 'demian@gmail.com', 1],
//     ['john', 'john@gmail.com', 2],
//     ['mark', 'mark@gmail.com', 3],
//     ['pete', 'pete@gmail.com', 4]
// ];
// conn.query(sql, [values], function(err) {
//     if (err) throw err;
//     conn.end();
// });