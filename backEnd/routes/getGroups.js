/**
 * Created by lenovo on 2017/3/30.
 */

var express = require('express');
var User = require('../db/User');
var router = express.Router();


/* GET home page. */
router.post('/', function (req, res, next) {

    var userId = req.body.userId;
    if(userId) {
        User.getGroups({userId : userId}, function (data) {
            console.log(data);
            res.send(data);
        })
    }
});

module.exports = router;
