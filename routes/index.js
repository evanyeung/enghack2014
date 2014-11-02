var express = require('express');
var router = express.Router();

var title = 'Jams';

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: title });
});
router.get('/:id', function(req, res) {
    res.render('room', {title: title, roomId: req.param('id')});
});

module.exports = router;
