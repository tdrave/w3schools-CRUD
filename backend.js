const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express()
const port = 3000

//configuring body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//fix cors
app.use(cors());

// setup db connection
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'ugmarket.ugent.be',
  port     : 13306,
  user     : 'yourUsername',
  password : 'yourPassword',
  database : 'exClassTest',
  timezone : 'CET'
});
connection.connect();

// function to get time (HH:MM:SS)
let getTime = () => new Date().toTimeString().split(' ')[0];

// app listens on the home route for incoming POST requests
app.post('/', (req, res) => {
  // no query found in body
  if (!req.body['query'])
    res.send({error: 'ERROR: couldn\'t find any query to be executed'});
  else {
    // send query to db
    connection.query(req.body['query'], function (error, results, fields) {
      // catch errors
      if (error) {
        res.send({error: error['sqlMessage']})
        console.log(getTime(), 'Error while executing query \'' + req.body['query'] + '\': ' + error['sqlMessage'])
      } else {
        res.send({data: results});
        console.log(getTime(), 'Executed query: \'' + req.body['query'] + '\'');
      }
    });
}})

app.listen(port, () => {
  console.log(getTime(), `Backend is running on http://localhost:${port}`)
})
