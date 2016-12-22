/**
 * Created by bradyzhang on 2016/12/21.
 */
var express = require('express');
var router = express.Router();
var User = require('../db/User');
var filterString = require('../tools/index').filterString;
/* GET home page. */
router.post('/', function (req, res, next) {
    var data = {
        userName : filterString(req.body.userName),
        password : filterString(req.body.password),
        email : filterString(req.body.email),
        phone : filterString(req.body.phone)
    };
    User.addUser(data, function (json) {
        if(json.result === 0){
            res.render('index');
        }else {
            res.end(json);
        }
    });
});

module.exports = router;
