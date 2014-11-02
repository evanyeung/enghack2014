var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'MyApp' });
});
router.get('/:id', function(req, res) {
    console.log(req.param('id'));
    res.render('index', {title: 'MyApp', roomId: req.param('id')});
});

module.exports = router;
