 //server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
import sitesRoutes from './src/routes/sitesRoutes';
import trustsRoutes from './src/routes/trustsRoutes';

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.PORT || 3001;

//db config
var mongoDB = 'mongodb://awhite:asby1!@ds161026.mlab.com:61026/asbestos_trust_db';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');


  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

if (process.env.NODE_ENV === 'production') {
      app.get(/^\/(?!api).*/, (req, res) => { // don't serve react app to api routes
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });
};

app.use('/api', router);

sitesRoutes(router);
trustsRoutes(router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
