var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('other/index', { title: 'Digital Movies' });
});

module.exports = router;
