import mongoose, { Types } from 'mongoose';
import { SitesSchema } from '../models/sites';
import { Promise } from 'bluebird';

const Site = mongoose.model('Site', SitesSchema);

const ObjectID = Types.ObjectId;

// const formatQuery = (query) => {

// }

export const getSites = (req, res) => {

    var unnarrowedByTrustQuery = {};
    var narrowedByTrustQuery = {};
    var pageSize = 10;
    var currentPage = 1;
    var tmp = {};
    var sortBy = {};
    var offset;

    console.log("req.query", req.query);

    Object.keys(req.query).map(prop => {
      if (prop === 'currentPage') {
        currentPage = parseInt(req.query[prop]);
      } else if (prop === 'pageSize') {
        pageSize = parseInt(req.query[prop]);
      } else if (prop === 'sortDirection') {
        tmp[prop] = parseInt(req.query[prop]);
      } else if (prop === 'sortCategory') {
        tmp[prop] = req.query[prop]
      } else if (prop === 'trust_id') {
        narrowedByTrustQuery['trust_id'] = new ObjectID(req.query[prop]);
      } else if (prop === 'date_from' || prop === 'date_to') {
        console.log("dates", req.query[prop])
        // narrowedByTrustQuery[prop] = new Date(req.query[prop].year, req.query[prop].month, req.query[prop].day);
        // unnarrowedByTrustQuery[prop] = new Date(req.query[prop].year, req.query[prop].month, req.query[prop].day);
      } else {
        narrowedByTrustQuery[prop] = new RegExp(req.query[prop], 'i');
        unnarrowedByTrustQuery[prop] = new RegExp(req.query[prop], 'i');
      }
    });

    offset = pageSize * (currentPage - 1);

    sortBy = (Object.keys(tmp).length === 0) ? {'trust_id': 1} : {[tmp.sortCategory]: tmp.sortDirection};

    // { price: { $not: { $gt: 1.99 } } }

    var sampleDate = new Date(1960,0,1,1,1,1,1);

    // narrowedByTrustQuery['start_date'] = { $lte: sampleDate }
    // unnarrowedByTrustQuery['start_date'] = { $lte: sampleDate }


    // if (narrowedTrustId && narrowedTrustId.toString.length > 0) {
    //   // console.log("NARROWEDTRUSTID length > 0");
    //   console.log("pre-narrow query", query);
    //   narrowedTrustSearch = query;
    //   console.log("post-narrow query", query);
    //   narrowedTrustSearch.trust_id = narrowedTrustId;
    // }

    narrowedByTrustQuery.state = 'AR';
    unnarrowedByTrustQuery.state = 'AR';


    // console.log("unnarrowedByTrustQuery", unnarrowedByTrustQuery);
    // console.log("narrowedByTrustQuery", narrowedByTrustQuery);
    console.log("offset", offset);


    // console.log("finalized-narrow query", query);
    // console.log("narrowedTrustId", narrowedTrustId, narrowedTrustId.toString.length);
    // console.log("narrowedTrustSearch", narrowedTrustSearch);

    Promise.all([
        Site.find(narrowedByTrustQuery).skip(offset).limit(pageSize).sort(sortBy).exec(),
        Site.count(narrowedByTrustQuery).exec(),
        Site.count(unnarrowedByTrustQuery).exec(),
        Site.find(unnarrowedByTrustQuery).distinct('trust_id').exec()
      ]).spread(function(sites, narrowedSiteCount, unnarrowedSiteCount, trustList) {

          let data = { sites,
                    narrowedSiteCount,
                    unnarrowedSiteCount,
                    trustList };

          res.json(data);

      }, function(err) {
         handleError(res, err);
      });

  };

export const addNewSite = (req, res) => {

  var site = new Site();

  (req.body.trust_id) ? site.trust_id = req.body.trust_id : null;
  (req.body.name) ? site.name = req.body.name : null;
  (req.body.city) ? site.city = req.body.city : null;
  (req.body.state) ? site.state = req.body.state : null;
  (req.body.country) ? site.country = req.body.country : null;
  (req.body.start_date) ? site.start_date = req.body.start_date : null;
  (req.body.end_date) ? site.end_date = req.body.end_date : null;
  (req.body.site_code) ? site.site_code = req.body.site_code : null;

  site.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Site successfully added!' });
  });

};

export const updateSite = (req, res) => {

 Site.findById(req.params.site_id, function(err, site) {

   if (err)
     res.send(err);

   (req.body.name) ? site.name = req.body.name : null;
   (req.body.city) ? site.city = req.body.city : null;
   (req.body.state) ? site.state = req.body.state : null;
   (req.body.country) ? site.country = req.body.country : null;
   (req.body.start_date) ? site.start_date = req.body.start_date : null;
   (req.body.end_date) ? site.end_date = req.body.end_date : null;
   (req.body.site_code) ? site.site_code = req.body.site_code : null;

   site.save(function(err) {
     if (err)
       res.send(err);

     res.json({ message: 'Site successfully updated!' });

   });
 });
}

export const deleteSite = (req, res) => {

  Site.remove({ _id: req.params.site_id }, function(err, site) {

    if (err)
      res.send(err);

    res.json({ message: 'Site has been deleted' })

  })
};


