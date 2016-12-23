/**
 * Created by bradyzhang on 2016/12/22.
 */
var express = require('express');
var router = express.Router();
var sendCode = require('../messageSDK/index');
var redisCache = require('../db/redisCache');
var tools = require('../tools/index');
var filterString = tools.filterString;
var getRandom = tools.getRandom;

router.post('/', function (req, res, next) {
    var phone = filterString(req.body.phone);
    var code = getRandom();
    if(phone){
        sendCode(phone, code, function (json) {
            if(json.result === 0){
                redisCache.setPhoneCode(phone, code, function (json) {
                    if(json.result === 0){
                        res.send({
                            result : 0,
                            message : 'success'
                        });
                    }else {
                        res.send({
                            result : -1,
                            message : 'error'
                        });
                    }
                });
            }else{
                res.send({
                    result : -1,
                    message : 'error'
                });
            }

        });
    }


});

module.exports = router;
