const express = require('express');
const mysql = require('mysql');
const sql = require('mssql');
const app = express();
const app2 = express();

const port = process.env.PORT || 4000;


//MSSQL server

// const dbConfig = {
//   server: "HCMCLDC.mssql.somee.com",
//   user: "phuchuynh247_SQLLogin_1",
//   password: "5nze3wax5g",
//   database: "HCMCLDC",
//   options: {
//     encrypt: false,
//     trustServerCertificate:false
//   },
//   port: 1433
// };

// const conn = new sql.ConnectionPool(dbConfig);

// conn.connect(function (err) {
//   (err) ? console.log(err) : console.log(conn);
// });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// app.get('/api/mssql', (req, res) => {
//   var sqlqr = "SELECT TOP (10) [ID],[IPAddress],[Datetime],[Page],[Session],[QuocGia],[Tinh],[ThanhPho],[Cty],[Lat],[Lon] FROM IPRecord ORDER BY [ID] DESC";
//   conn.query(sqlqr, function (err, recordset) {
//     if (err) throw err;
//     res.json({ recordset });
//   });
// });

//Mongo connection
const { MongoClient } = require('mongodb');
var db;
const uri = "mongodb+srv://Mongodb:PuHh1234@cluster0.y7au8.mongodb.net/mongodb?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  db = client.db("MongoDB");
});

// Connect through localhost
// MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//   // Client returned
//   db = client.db('Data');
// });
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/api/mongo', (req, res) => {
  db.collection('Account').find().toArray(function (err, docs) {
    if (err) throw err;
    res.json({ news: docs });
  });
});

// //Mysql Connection
// const connection = mysql.createConnection({
//   host: 'sql6.freemysqlhosting.net',
//   user: 'sql6438575',
//   password: 'IDuV5V7kJJ',
//   database: 'sql6438575'
// });

// connection.connect(function (err) {
//   (err) ? console.log(err) : console.log(connection);
// });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// app.get('/api/mysql', (req, res) => {
//   var sql = "SELECT * FROM Data";
//   connection.query(sql, function (err, results) {
//     if (err) throw err;
//     res.json({ news: results });
//   });
// });

//Get
app.get('/', (req, res) => {
  //res.header('Access-Control-Allow-Origin', '*');
  res.send('Xin chao');
});

app.listen(port, () => console.log('Server listening on port 4000!'));
