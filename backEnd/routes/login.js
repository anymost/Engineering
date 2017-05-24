var express = require('express');
var router = express.Router();
var User = require('../db/User');
var filterString = require('../tools/index').filterString;
var crypto = require('crypto');


router.post('/', function (req, res, next) {
    var cyphier = crypto.createHash('sha256');
    cyphier.update(req.body.password);
    var password = cyphier.digest('hex');
    var data = {
        userName : filterString(req.body.userName),
        password : password
    };
    User.verifyUser(data, function (json) {
        if (json.result == 0) {
            res.cookie('userId', json.userId, {expires: new Date(Date.now() + 10000 * 60 * 60)});
            res.cookie('userName', json.userName, {expires: new Date(Date.now() + 10000 * 60 * 60)});
            res.cookie('headPicture', json.headPicture, {expires: new Date(Date.now() + 10000 * 60 * 60)});
            res.redirect('//localhost:8080');
        } else {
            res.render('error');
        }
    });
});

module.exports = router;
