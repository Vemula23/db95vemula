var express = require('express');
var router = express.Router();
var medicine_controlers = require('../controllers/medicine');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('medicine', { title: 'Search Results medicine' });
});

/* GET detail costume page */
router.get('/detail', medicine_controlers.medicine_view_one_Page);

router.get('/create', medicine_controlers.medicine_create_Page);

router.get('/update', medicine_controlers.medicine_update_Page);

router.get('/delete', medicine_controlers.medicine_delete_Page);


module.exports = router;