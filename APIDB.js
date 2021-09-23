const express = require('express');
const mysql = require('mysql');
var sql = require('mssql');
const app = express();

const port = process.env.PORT || 4000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//MSSQL server

var dbConfig = {
  host: 'HCMCLDC.mssql.somee.com',
  user: 'phuchuynh247_SQLLogin_1',
  password: '5nze3wax5g',
  database: 'HCMCLDC',
  trustServerCertificate: true,
  port: 1433
};

var conn = new sql.ConnectionPool(dbConfig);

conn.connect(function (err) {
  (err) ? console.log(err) : console.log(conn);
});


app.post('/api/mssql', (req, res) => {
  var sqlqr = "SELECT TOP (10) [ID],[IPAddress],[Datetime],[Page],[Session],[QuocGia],[Tinh],[ThanhPho],[Cty],[Lat],[Lon] FROM [IPRecord] ORDER BY [ID] DESC";
  conn.query(sqlqr, function (err, recordset) {
    if (err) throw err;
    res.json({ recordset });
  });
});

//Mongo connection
// var MongoClient = require('mongodb').MongoClient;
// var db;

// MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//   // Client returned
//   db = client.db('Data');
// });

// app.post('/api/mongo', (req, res) => {
//   db.collection('Account').find().toArray(function (err, docs) {
//     if (err) throw err;
//     res.json({ news: docs });
//   });
// });

// //Mysql Connection
const connection = mysql.createConnection({
  host: 'sql6.freemysqlhosting.net',
  user: 'sql6438575',
  password: 'IDuV5V7kJJ',
  database: 'sql6438575'
});

connection.connect(function (err) {
  (err) ? console.log(err) : console.log(connection);
});

app.get('/api/news', (req, res) => {
  var sql = "SELECT * FROM Data";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});

//Get
app.get('/', (req, res) => {
  //res.header('Access-Control-Allow-Origin', '*');
  res.send('Xin chao');
});

app.listen(port, () => console.log('Server listening on port 4000!'));
