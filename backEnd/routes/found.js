/**
 * Created by bradyzhang on 2016/12/21.
 */
var express = require('express');
var router = express.Router();
var User = require('../db/User');
var filterString = require('../../tools/index').filterString;


router.post('/', function (req, res, next) {
    var code = filterString(req.body.code);
    var userName = filterString(req.body.userName);
    if(code){

    }

});

module.exports = router;
