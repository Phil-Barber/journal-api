const express = require('express')
const app = express()
const cors = require('cors');
const { Client } = require('pg');

const items = require('./routes/items.js');
const connectionDetails = require('../config/db-connection');

const client = new Client(connectionDetails);
client.connect();

app.use(function (req, res, next) {
    req.db = client;
    next();
});

const corsOpts = {
    origin : "http://localhost:8080"
}

app.use(cors(corsOpts));

app.use('/items', items);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
      error : err,
      message : err.message
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

