var express = require('express');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var router = express.Router();
var contact = require('../controllers/ContactController');
/* GET home page. */
router.get('/contacts', function(req, res, next) {
  res.render('pages/contacts', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
    res.render('pages/about', { title: 'Express' });
  });

  router.get('/faq', function(req, res, next) {
    res.render('pages/faq', { title: 'Express' });
  });

  router.get('/terms', function(req, res, next) {
    res.render('pages/terms', { title: 'Express' });
  });

  // router.get('/contacts', contact.susisiekti); //contact => controller name
  router.post('/contacts', urlencodedParser, contact.kontaktai); //contact => controller name

module.exports = router;