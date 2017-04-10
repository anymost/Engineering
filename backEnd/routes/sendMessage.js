/**
 * Created by lenovo on 2017/4/9.
 */



var express = require('express');
var redisCache = require('../db/redisCache');
var router = express.Router();



router.post('/', function (req, res, next) {

    var senderId = req.body.senderId;
    var receiverId = req.body.receiverId;
    var message = req.body.message;
    if(senderId && receiverId && message) {
        redisCache.saveMessage({
            senderId : senderId,
            receiverId : receiverId,
            message : message,
            date : Date.now()
        }, function(result){

        });
    }
});

module.exports = router;
