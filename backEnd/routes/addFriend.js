/**
 * Created by lenovo on 2017/4/7.
 */



var express = require('express');
var User = require('../db/User');
var router = express.Router();



router.post('/', function (req, res, next) {

    let userId = req.body.userId;
    let friendId = req.body.friendId;
    if(userId && friendId) {
        User.addFriend({userId:userId,friendId:friendId}, function (data) {
            res.send(data);
        })
    }
});

module.exports = router;
