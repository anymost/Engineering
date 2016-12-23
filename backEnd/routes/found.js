/**
 * Created by bradyzhang on 2016/12/21.
 */
var express = require('express');
var router = express.Router();
var User = require('../db/User');
var filterString = require('../tools/index').filterString;
var getPhoneCode = require('../db/redisCache').getPhoneCode;


router.post('/', function (req, res, next) {
    var phone = req.body.phone ? filterString(req.body.phone) : '';
    var code = req.body.code ? filterString(req.body.code) : '';
    if(phone && code){
        getPhoneCode(phone, function (json) {
           if(json.result === 0){
                if(json.data === code){
                    res.render('found');
                }else{
                    res.redirect('/');
                }
           } else{
               res.redirect('/');
           }
        });
    }else {
        res.redirect ('/');
    }


});

module.exports = router;
