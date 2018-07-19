var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
import { Promise } from 'bluebird';
// var getSites = require('./db/controllers/sitesController');

require('dotenv').config();

//set our port to either a predetermined port number if you have set it up, or 3001
// app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//db config
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api handling
var TrustsSchema = new Schema({
  id: String,
  name: String
});

var SitesSchema = new Schema({
  trust_id: {type: Schema.ObjectId},
  name: {type: String},
  city: {type: String},
  state: {type: String},
  country: {type: String},
  start_date: {type: Date, default: '1/1/1900'},
  end_date: {type: Date, default: '12/31/2017'},
  site_code: {type: String},
  category: String,
  direction: String,
  narrowedTrustId: Schema.ObjectId
});

var Trust = mongoose.model('Trust', TrustsSchema);

var Site = mongoose.model('Site', SitesSchema);

app.get("/api/trusts", (req, res) => {
      Trust.find(function(err, trusts) {
        if (err) {
          res.send(err);
        }
        res.json(trusts)
      });
});

app.get("/api/sites", (req, res) => {
      Site.findOne({}, function(err, sites) {

        if (err) {
          res.send(err);
        }
        var trustList = [];

        var data = { sites: sites, trustList: trustList };

        res.json(data);
      });
});



// app.get("/api/sites", (req, res) => {
// 	  var unnarrowedByTrustQuery = {};
// 	  var narrowedByTrustQuery = {};
// 	  var pageSize = 10;
// 	  var currentPage = 1;
// 	  var tmp = {};
// 	  var sortBy = {};
// 	  var offset;

// 	  console.log("req.query", req.query);

// 	  Object.keys(req.query).map(prop => {
// 	    if (prop === 'currentPage') {
// 	      currentPage = parseInt(req.query[prop]);
// 	    } else if (prop === 'pageSize') {
// 	      pageSize = parseInt(req.query[prop]);
// 	    } else if (prop === 'sortDirection') {
// 	      tmp[prop] = parseInt(req.query[prop]);
// 	    } else if (prop === 'sortCategory') {
// 	      tmp[prop] = req.query[prop]
// 	    } else if (prop === 'trust_id') {
// 	      narrowedByTrustQuery['trust_id'] = new ObjectID(req.query[prop]);
// 	    } else if (prop === 'date_from' || prop === 'date_to') {
// 	      console.log("dates", req.query[prop])
// 	      // narrowedByTrustQuery[prop] = new Date(req.query[prop].year, req.query[prop].month, req.query[prop].day);
// 	      // unnarrowedByTrustQuery[prop] = new Date(req.query[prop].year, req.query[prop].month, req.query[prop].day);
// 	    } else {
// 	      narrowedByTrustQuery[prop] = new RegExp(req.query[prop], 'i');
// 	      unnarrowedByTrustQuery[prop] = new RegExp(req.query[prop], 'i');
// 	    }
// 	  });

// 	  offset = pageSize * (currentPage - 1);

// 	  sortBy = (Object.keys(tmp).length === 0) ? {'trust_id': 1} : {[tmp.sortCategory]: tmp.sortDirection};

// 	  // { price: { $not: { $gt: 1.99 } } }

// 	  var sampleDate = new Date(1960,0,1,1,1,1,1);

// 	  // narrowedByTrustQuery['start_date'] = { $lte: sampleDate }
// 	  // unnarrowedByTrustQuery['start_date'] = { $lte: sampleDate }


// 	  // if (narrowedTrustId && narrowedTrustId.toString.length > 0) {
// 	  //   // console.log("NARROWEDTRUSTID length > 0");
// 	  //   console.log("pre-narrow query", query);
// 	  //   narrowedTrustSearch = query;
// 	  //   console.log("post-narrow query", query);
// 	  //   narrowedTrustSearch.trust_id = narrowedTrustId;
// 	  // }

// 	  narrowedByTrustQuery.state = 'AR';
// 	  unnarrowedByTrustQuery.state = 'AR';


// 	  // console.log("unnarrowedByTrustQuery", unnarrowedByTrustQuery);
// 	  // console.log("narrowedByTrustQuery", narrowedByTrustQuery);
// 	  console.log("offset", offset);


// 	  // console.log("finalized-narrow query", query);
// 	  // console.log("narrowedTrustId", narrowedTrustId, narrowedTrustId.toString.length);
// 	  // console.log("narrowedTrustSearch", narrowedTrustSearch);

// 	  Promise.all([
// 	      Site.find(narrowedByTrustQuery).skip(offset).limit(pageSize).sort(sortBy).exec(),
// 	      Site.count(narrowedByTrustQuery).exec(),
// 	      Site.count(unnarrowedByTrustQuery).exec(),
// 	      Site.find(unnarrowedByTrustQuery).distinct('trust_id').exec()
// 	    ]).spread(function(sites, narrowedSiteCount, unnarrowedSiteCount, trustList) {

// 	        let data = { sites,
// 	                  narrowedSiteCount,
// 	                  unnarrowedSiteCount,
// 	                  trustList };

// 	        res.json(data);

// 	    }, function(err) {
// 	       handleError(res, err);
// 	    });

// 	});

var server = app.listen(process.env.PORT || 3001, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});

// app.listen(process.env.PORT || 3001, () => {
//   console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
// });

// //server.js
// 'use strict'

// //first we import our dependencies...
// var express = require('express');
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var path = require('path');
// // var cors = require('cors');
// var bodyParser = require('body-parser');
// // var sitesRoutes = require('./db/routes/sitesRoutes');
// // var trustsRoutes = require('./db/routes/trustsRoutes');

// require('dotenv').config();

// //and create our instances
// var app = express();
// var router = express.Router();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// var mongoDB = process.env.MONGODB_URI;
// mongoose.connect(mongoDB);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// //now we should configure the API to use bodyParser and look for JSON data in the request body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // app.use('/api', router);

// // sitesRoutes(router);
// // trustsRoutes(router);

// // api handling
// var TrustsSchema = new Schema({
//   id: String,
//   name: String
// });

// var Trust = mongoose.model('Trust', TrustsSchema);

// app.get("/api/trusts", (req, res) => {
//       Trust.find(function(err, trusts) {
//         if (err) {
//           res.send(err);
//         }
//         res.json(trusts)
//       });
// });

// //starts the server and listens for requests
// var server = app.listen(process.env.PORT || 3001, function () {
//  var port = server.address().port;
//  console.log("Express is working on port " + port);
// });
