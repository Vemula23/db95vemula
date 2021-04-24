var express = require('express');
var router = express.Router();
var medicine_controlers = require('../controllers/medicine');

const secured = (req, res, next) => {
  if (req.user){
  return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
  }

/* GET detail costume page */
router.get('/', medicine_controlers.medicine_view_all_Page);
router.get('/detail',secured, medicine_controlers.medicine_view_one_Page);

router.get('/create',secured, medicine_controlers.medicine_create_Page);

router.get('/update',secured, medicine_controlers.medicine_update_Page);

router.get('/delete', medicine_controlers.medicine_delete_Page);


module.exports = router;