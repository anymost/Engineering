var express = require('express');
var router = express.Router();
var User = require('../db/User');
var filterString = require('../tools/index').filterString;

router.post('/', function (req, res, next) {
   var requestBody = {};
    requestBody.userName = filterString(req.body.userName);
    requestBody.password = filterString(req.body.password);

    User.verifyUser(requestBody, function (json) {
       if(json.result == 0){
           res.cookie('userId', json.userId, { expires: new Date(Date.now() + 10000 * 60 * 60) });
           res.cookie('userName', json.userName, { expires: new Date(Date.now() + 10000 * 60 * 60) });
           res.cookie('headPicture', json.headPicture ,{ expires: new Date(Date.now() + 10000 * 60 * 60) });
           res.render('index');
       }else {
           res.end(json.message);
       }
    });
});

module.exports = router;