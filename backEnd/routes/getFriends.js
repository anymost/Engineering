
var express = require('express');
var User = require('../db/User');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    var userId = req.body.userId;
    if(userId) {
        User.getFriends({userId : userId}, function (data) {
            res.send(data);
        })
    }
});

module.exports = router;
